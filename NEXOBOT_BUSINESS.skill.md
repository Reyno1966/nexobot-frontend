# NEXOBOT_BUSINESS — Skill de Referencia

> Módulo de gestión de negocio integrado en el dashboard de NexoBot.
> Última actualización: 2026-03-13

---

## ¿Qué es?

Un módulo completo dentro del dashboard de NexoBot que permite a cada cliente gestionar
su negocio sin salir de la plataforma:

- **Gastos**: registrar compras y gastos con categorías, proveedor y fecha
- **Ventas**: caja diaria con método de pago (efectivo/tarjeta/transferencia/otro)
- **Inventario**: vista de productos con margen de ganancia, stock y alertas
- **Facturas**: reusa `/dashboard/invoices` (tabla `invoices`)
- **Notas**: sticky notes con colores, pin y grid masonry

---

## Rutas del dashboard

| Ruta | Estado | Descripción |
|------|--------|-------------|
| `/dashboard/business` | ✅ Funcional | Overview con KPIs (ingresos, gastos, ganancia) |
| `/dashboard/business/expenses` | ✅ Funcional | CRUD completo de gastos |
| `/dashboard/business/sales` | ✅ Funcional | CRUD completo de ventas / caja |
| `/dashboard/business/inventory` | ✅ Funcional | Vista inventario con margen y alertas de stock |
| `/dashboard/business/notes` | ✅ Funcional | Sticky notes con colores, pin, grid masonry |
| `/dashboard/invoices` | ✅ Existente | Facturas (tabla `invoices`, tab en layout) |

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
| GET | `/api/products` | Usado por inventory/page.tsx (API existente) |

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

### Pendiente — `products.cost_price`
```sql
-- Ejecutar cuando la tabla products exista:
ALTER TABLE products ADD COLUMN IF NOT EXISTS cost_price NUMERIC(10,2) NOT NULL DEFAULT 0;
-- Permite calcular margen: ((price - cost_price) / price) * 100
```
> La página `inventory/page.tsx` ya consume `cost_price` si existe,
> y muestra "Sin costo" en los productos donde vale 0.

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

## Archivos del módulo (estado final 2026-03-13)

```
business-module-schema.sql               ← Schema SQL completo (ejecutado en Supabase)
CLAUDE.md                                ← Documentación del proyecto
NEXOBOT_BUSINESS.skill.md               ← Este archivo

app/
  dashboard/
    business/
      layout.tsx                         ← Sub-navegación: 6 tabs (actualizado)
      page.tsx                           ← Overview con KPIs
      expenses/
        page.tsx                         ← CRUD completo (gastos)
      sales/
        page.tsx                         ← CRUD completo (ventas / caja)
      inventory/
        page.tsx                         ← Vista productos + margen + alertas stock
      notes/
        page.tsx                         ← Sticky notes grid (colores + pin)

app/api/business/
  expenses/
    route.ts                             ← GET + POST
    [id]/route.ts                        ← PUT + DELETE
  sales/
    route.ts                             ← GET + POST
    [id]/route.ts                        ← PUT + DELETE
  notes/
    route.ts                             ← GET + POST
    [id]/route.ts                        ← PUT + DELETE

components/dashboard/
  Sidebar.tsx                            ← "Mi Negocio" con ícono de edificio
```

---

## Detalles de UX por pantalla

### expenses/page.tsx
- Stats: total mes (rojo), categoría mayor, top 3 por categoría
- Filtros: por categoría (8 opciones) + selector mes ← →
- Tabla con hover-reveal acciones (editar/eliminar)
- Modal slide-up en móvil / centrado en desktop
- Categorías: Compras, Servicios, Nómina, Marketing, Alquiler, Transporte, Equipamiento, Otros

### sales/page.tsx
- Stats: total mes (teal), método más usado, desglose por método
- Filtros: por método de pago (💵💳🏦🔄) + selector mes ← →
- Misma tabla + modal que expenses
- Métodos: efectivo, tarjeta, transferencia, otro

### inventory/page.tsx
- Stats: productos activos, valor de stock, stock bajo (≤5), sin stock (0)
- Buscar por nombre/categoría + filtro activos/inactivos/todos
- Tabla: nombre, precio venta, costo, margen %, stock badge, estado
- Margen: verde ≥50%, naranja ≥20%, rojo <20%, "Sin costo" si cost_price=0
- CTA "Gestionar productos" → /dashboard/products
- Banner aviso si hay productos sin cost_price registrado

### notes/page.tsx
- Stats: total notas, fijadas, top 2 colores
- Filtro por color (5 opciones)
- Grid masonry (columns-1 → 2 → 3)
- Toggle pin directo desde la tarjeta (sin abrir modal)
- Modal con textarea + selector de color (dots) + toggle pin
- Contador de caracteres en tiempo real (max 2000)

---

## Patrones usados

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

### Page — patrón de estado
```typescript
"use client";
const [items, setItems]     = useState<T[]>([]);
const [loading, setLoading] = useState(true);
const [saving, setSaving]   = useState(false);
const [deleting, setDeleting] = useState<string | null>(null);
const [saveError, setSaveError] = useState("");
```

### Seguridad en todas las APIs
- `getAuth()` en cada handler
- `eq("user_id", userId)` + RLS como doble verificación
- Validación de tipos antes de tocar BD
- Campos parciales en PUT (solo se actualiza lo enviado)

---

## Próximas sesiones

1. **Reportes mensuales** — PDF con resumen gastos/ventas/margen (Pro/Premium)
2. **Dashboard overview mejorado** — gráficas de tendencia (últimos 6 meses)
3. **`products.cost_price`** — ejecutar ALTER TABLE cuando la tabla products exista
4. **Plan Business $79** — si se decide un plan dedicado para el módulo
5. **Bot conectado al inventario** — chatbot consulta stock en tiempo real
6. **Export CSV** — exportar gastos/ventas como CSV (Pro/Premium)
