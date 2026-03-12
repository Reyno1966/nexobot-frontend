# NEXOBOT_BUSINESS — Skill de Referencia

> Módulo de gestión de negocio integrado en el dashboard de NexoBot.
> Última actualización: 2026-03-12

---

## ¿Qué es?

Un módulo completo dentro del dashboard de NexoBot que permite a cada cliente gestionar
su negocio sin salir de la plataforma:

- **Gastos**: registrar compras y gastos con categorías, proveedor y fecha
- **Ventas**: caja diaria con método de pago (efectivo/tarjeta/transferencia)
- **Inventario**: reusa `/dashboard/products` (tabla `products`)
- **Facturas**: reusa `/dashboard/invoices` (tabla `invoices`)
- **Notas**: recordatorios rápidos con colores y pin

---

## Rutas del dashboard

| Ruta | Estado | Descripción |
|------|--------|-------------|
| `/dashboard/business` | ✅ Funcional | Overview con KPIs (ingresos, gastos, ganancia) |
| `/dashboard/business/expenses` | ✅ Funcional | CRUD completo de gastos |
| `/dashboard/business/sales` | 🟡 Placeholder | Próximamente (APIs listas) |
| `/dashboard/business/notes` | 🟡 Placeholder | Próximamente (APIs listas) |
| `/dashboard/products` | ✅ Existente | Inventario (tabla `products` + `cost_price`) |
| `/dashboard/invoices` | ✅ Existente | Facturas (tabla `invoices`) |

---

## API Routes

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/business/expenses?year=YYYY&month=MM` | Lista gastos del mes |
| POST | `/api/business/expenses` | Crea gasto |
| PUT | `/api/business/expenses/[id]` | Actualiza gasto (campos parciales) |
| DELETE | `/api/business/expenses/[id]` | Elimina gasto |
| GET | `/api/business/sales?year=YYYY&month=MM` | Lista ventas del mes |
| POST | `/api/business/sales` | Registra venta |
| PUT | `/api/business/sales/[id]` | Actualiza venta |
| DELETE | `/api/business/sales/[id]` | Elimina venta |
| GET | `/api/business/notes` | Lista todas las notas (pinned primero) |
| POST | `/api/business/notes` | Crea nota |
| PUT | `/api/business/notes/[id]` | Actualiza nota (content/color/is_pinned) |
| DELETE | `/api/business/notes/[id]` | Elimina nota |

---

## Tablas Supabase

### `business_expenses`
```sql
id          UUID        PK
user_id     UUID        FK → auth.users
description TEXT        NOT NULL
amount      NUMERIC(10,2) NOT NULL CHECK (>= 0)
category    TEXT        NOT NULL DEFAULT 'Otros'
supplier    TEXT        NULLABLE
date        DATE        NOT NULL DEFAULT CURRENT_DATE
receipt_url TEXT        NULLABLE
notes       TEXT        NULLABLE
created_at  TIMESTAMPTZ
updated_at  TIMESTAMPTZ  -- auto-updated via trigger
```

### `business_sales`
```sql
id             UUID          PK
user_id        UUID          FK → auth.users
date           DATE          NOT NULL DEFAULT CURRENT_DATE
description    TEXT          NOT NULL
amount         NUMERIC(10,2) NOT NULL CHECK (>= 0)
payment_method TEXT          NOT NULL DEFAULT 'efectivo'
               -- valores: efectivo | tarjeta | transferencia | otro
category       TEXT          NULLABLE
notes          TEXT          NULLABLE
created_at     TIMESTAMPTZ
updated_at     TIMESTAMPTZ
```

### `business_notes`
```sql
id         UUID        PK
user_id    UUID        FK → auth.users
content    TEXT        NOT NULL (max 2000 chars)
color      TEXT        NOT NULL DEFAULT 'yellow'
           -- valores: yellow | blue | green | red | purple
is_pinned  BOOLEAN     NOT NULL DEFAULT false
created_at TIMESTAMPTZ
updated_at TIMESTAMPTZ
```

### Extensión a `products`
```sql
ALTER TABLE products ADD COLUMN cost_price NUMERIC(10,2) NOT NULL DEFAULT 0;
-- Permite calcular margen de ganancia: price - cost_price
```

---

## Acceso por plan

| Plan | Acceso |
|------|--------|
| free | Gastos, inventario básico, ventas del día, notas (limitado a 10 notas) |
| Starter | Igual que free |
| Pro | Acceso completo: + reportes PDF, exportación de datos |
| Premium | Igual que Pro |

> ⚠️ Los límites de plan se verifican **en servidor**, nunca solo en cliente.

---

## Archivos creados en esta sesión

```
business-module-schema.sql            ← Schema SQL completo (ejecutar en Supabase)
CLAUDE.md                             ← Documentación del proyecto (actualizado)
NEXOBOT_BUSINESS.skill.md            ← Este archivo

app/
  dashboard/
    business/
      layout.tsx                      ← Sub-navegación del módulo (6 tabs)
      page.tsx                        ← Overview con KPIs
      expenses/
        page.tsx                      ← CRUD completo de gastos (funcional)
      sales/
        page.tsx                      ← Placeholder (próximamente)
      notes/
        page.tsx                      ← Placeholder (próximamente)

app/api/business/
  expenses/
    route.ts                          ← GET + POST
    [id]/route.ts                     ← PUT + DELETE
  sales/
    route.ts                          ← GET + POST
    [id]/route.ts                     ← PUT + DELETE
  notes/
    route.ts                          ← GET + POST
    [id]/route.ts                     ← PUT + DELETE

components/dashboard/
  Sidebar.tsx                         ← Añadido "Mi Negocio" con ícono de edificio
```

---

## Patrones usados (consistentes con el resto del proyecto)

### API Routes — estructura estándar
```typescript
import { getAuth } from "@/lib/auth";

export async function GET(req: Request) {
  const auth = await getAuth();
  if (!auth) return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  const { supabase, userId } = auth;
  // ...
}
```

### Page — estructura estándar
```typescript
"use client";
import { useState, useEffect, useCallback } from "react";

export default function ExpensesPage() {
  const [items, setItems]       = useState<Expense[]>([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/business/expenses?...");
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setItems(data.expenses);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error desconocido");
    } finally {
      setLoading(false);
    }
  }, [/* deps */]);

  useEffect(() => { fetchItems(); }, [fetchItems]);
  // ...
}
```

---

## Próximas sesiones

1. **Ventas del día** — implementar `sales/page.tsx` completo (misma UX que expenses)
2. **Notas** — implementar `notes/page.tsx` con grid de sticky notes
3. **Reportes mensuales** — PDF con resumen de gastos/ventas (planes Pro/Premium)
4. **Plan Business $79** — si se decide crear un plan dedicado para el módulo
5. **Bot conectado al inventario** — el chatbot puede consultar stock en tiempo real
6. **Dashboard overview mejorado** — gráficas de tendencia (últimos 6 meses)

---

## Notas de implementación

- **RLS habilitado** en las 3 tablas nuevas — Supabase garantiza aislamiento por usuario
- **Triggers `updated_at`** — automáticos en UPDATE vía función `update_updated_at_column()`
- **Validaciones en servidor** — todos los campos validados antes de tocar BD
- **Campos parciales en PUT** — solo se actualiza lo que se envía en el body
- **Doble verificación de ownership** — `eq("user_id", userId)` + RLS
- **Categorías de expenses** — Compras, Servicios, Nómina, Marketing, Alquiler, Transporte, Equipamiento, Otros
- **Colores de notas** — yellow, blue, green, red, purple (hardcoded en API y tabla)
- **Métodos de pago (sales)** — efectivo, tarjeta, transferencia, otro
