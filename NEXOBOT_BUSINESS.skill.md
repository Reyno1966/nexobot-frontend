# NEXOBOT_BUSINESS — Skill de Referencia

> Módulo de gestión de negocio integrado en el dashboard de NexoBot.
> Última actualización: 2026-03-13 — Fase 2A completa + tablas products/invoices creadas en Supabase.

---

## ¿Qué se construyó hoy

Módulo completo de 6 pantallas funcionales con sus APIs, diseño coherente
con el resto del dashboard y documentación actualizada.

| Ruta | Estado | Descripción |
|------|--------|-------------|
| `/dashboard/business` | ✅ Funcional | Overview con KPIs: ingresos, gastos, ganancia neta del mes |
| `/dashboard/business/expenses` | ✅ Funcional | CRUD completo de gastos — 8 categorías, selector mes, modal |
| `/dashboard/business/sales` | ✅ Funcional | CRUD completo de ventas — 4 métodos de pago, selector mes, modal |
| `/dashboard/business/inventory` | ✅ Funcional | Vista inventario: margen %, stock badges, buscador, filtros |
| `/dashboard/business/notes` | ✅ Funcional | Sticky notes: 5 colores, pin, grid masonry, contador chars |
| `/dashboard/invoices` | ✅ Reutilizado | Tab en la navegación — apunta a ruta existente sin cambios |

---

## Decisiones técnicas tomadas

### 1. Reutilizar tablas existentes
`products` e `invoices` ya existían. En lugar de duplicar, el módulo
reutiliza `/dashboard/products` y `/dashboard/invoices` directamente.
Solo se crearon 3 tablas nuevas: `business_expenses`, `business_sales`, `business_notes`.

### 2. API Routes (no Server Actions)
Toda mutación pasa por rutas en `app/api/business/`. Mantiene coherencia
con el resto del proyecto donde **no se usan Server Actions**.

### 3. Planes existentes — sin plan nuevo esta sesión
- `free` / `Starter`: acceso básico (gastos, ventas, inventario, notas)
- `Pro` / `Premium`: acceso completo (reportes PDF, exportación — a implementar)
- No se creó el plan Business $79 — queda para sesión futura.

### 4. Inventario propio en el módulo
Se creó `business/inventory/page.tsx` con vista de margen de ganancia y
alertas de stock. El botón "Gestionar productos" enlaza a `/dashboard/products`
para la edición real. Esto permite mostrar métricas sin duplicar el CRUD de productos.

### 5. `cost_price` en `products` — pendiente
La columna `cost_price NUMERIC(10,2)` que habilita el cálculo de margen
**no se añadió todavía** porque la tabla `products` no existía en Supabase
en el momento de la sesión. La página `inventory/page.tsx` ya la consume
y muestra "Sin costo" cuando vale 0.

---

## ⚠️ Pendiente obligatorio antes de usar en producción

### Ejecutar en Supabase → SQL Editor

```sql
-- Pegar el contenido completo de: business-module-schema.sql
-- Crea: business_expenses, business_sales, business_notes + RLS + triggers
```

Archivo: **`business-module-schema.sql`** (en la raíz del proyecto).

El schema es idempotente (`IF NOT EXISTS`, `DROP TRIGGER IF EXISTS`,
`CREATE OR REPLACE FUNCTION`): se puede ejecutar varias veces sin error.

### Cuando `products` exista en Supabase, ejecutar además:

```sql
ALTER TABLE products
  ADD COLUMN IF NOT EXISTS cost_price NUMERIC(10,2) NOT NULL DEFAULT 0;
```

---

## Archivos tocados — análisis de riesgo para deploy

### 🟢 Archivos nuevos (riesgo cero — no rompen nada existente)

```
CLAUDE.md                                        ← nuevo (documentación)
NEXOBOT_BUSINESS.skill.md                        ← nuevo (este archivo)
business-module-schema.sql                       ← nuevo (ejecutar en Supabase manualmente)

app/api/business/expenses/route.ts               ← nueva ruta API
app/api/business/expenses/[id]/route.ts          ← nueva ruta API
app/api/business/sales/route.ts                  ← nueva ruta API
app/api/business/sales/[id]/route.ts             ← nueva ruta API
app/api/business/notes/route.ts                  ← nueva ruta API
app/api/business/notes/[id]/route.ts             ← nueva ruta API

app/dashboard/business/layout.tsx                ← nuevo layout
app/dashboard/business/page.tsx                  ← nueva página
app/dashboard/business/expenses/page.tsx         ← nueva página
app/dashboard/business/sales/page.tsx            ← nueva página
app/dashboard/business/inventory/page.tsx        ← nueva página
app/dashboard/business/notes/page.tsx            ← nueva página
```

### 🟡 Archivos existentes modificados (revisar antes del deploy)

| Archivo | Cambio | Riesgo |
|---------|--------|--------|
| `components/dashboard/Sidebar.tsx` | +10 líneas: nuevo ítem "Mi Negocio" añadido al array `NAV[]` | **Bajo** — el array es aditivo, no se tocó ningún ítem existente |

**Eso es todo.** Solo un archivo existente fue modificado en todo el módulo.

### 🔴 Archivos NO tocados (sin riesgo)

Estos archivos **no se modificaron** y funcionan exactamente igual que antes:

```
lib/auth.ts              middleware.ts           lib/plans.ts
app/api/products/*       app/api/invoices/*      app/dashboard/products/*
app/dashboard/invoices/* app/dashboard/bots/*    app/dashboard/billing/*
app/dashboard/settings/* app/layout.tsx          app/dashboard/layout.tsx
```

---

## API Routes — referencia completa

Todas usan `getAuth()` + doble verificación RLS + validación en servidor.

| Método | Ruta | Body / Query | Respuesta |
|--------|------|-------------|-----------|
| GET | `/api/business/expenses` | `?year=YYYY&month=MM` | `{ expenses: [...] }` |
| POST | `/api/business/expenses` | `{ description, amount, category, supplier?, date, notes? }` | `{ expense: {...} }` 201 |
| PUT | `/api/business/expenses/[id]` | campos parciales | `{ expense: {...} }` |
| DELETE | `/api/business/expenses/[id]` | — | `{ success: true }` |
| GET | `/api/business/sales` | `?year=YYYY&month=MM` | `{ sales: [...] }` |
| POST | `/api/business/sales` | `{ description, amount, payment_method, category?, date, notes? }` | `{ sale: {...} }` 201 |
| PUT | `/api/business/sales/[id]` | campos parciales | `{ sale: {...} }` |
| DELETE | `/api/business/sales/[id]` | — | `{ success: true }` |
| GET | `/api/business/notes` | — | `{ notes: [...] }` (pinned primero) |
| POST | `/api/business/notes` | `{ content, color?, is_pinned? }` | `{ note: {...} }` 201 |
| PUT | `/api/business/notes/[id]` | campos parciales | `{ note: {...} }` |
| DELETE | `/api/business/notes/[id]` | — | `{ success: true }` |

---

## Tablas Supabase

### `business_expenses`
```sql
id          UUID        PK DEFAULT gen_random_uuid()
user_id     UUID        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE
description TEXT        NOT NULL
amount      NUMERIC(10,2) NOT NULL CHECK (amount >= 0)
category    TEXT        NOT NULL DEFAULT 'Otros'
            -- Compras | Servicios | Nómina | Marketing | Alquiler | Transporte | Equipamiento | Otros
supplier    TEXT        NULLABLE
date        DATE        NOT NULL DEFAULT CURRENT_DATE
receipt_url TEXT        NULLABLE
notes       TEXT        NULLABLE
created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()  -- trigger automático
```

### `business_sales`
```sql
id             UUID          PK
user_id        UUID          NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE
date           DATE          NOT NULL DEFAULT CURRENT_DATE
description    TEXT          NOT NULL
amount         NUMERIC(10,2) NOT NULL CHECK (amount >= 0)
payment_method TEXT          NOT NULL DEFAULT 'efectivo'
               -- efectivo | tarjeta | transferencia | otro
category       TEXT          NULLABLE
notes          TEXT          NULLABLE
created_at     TIMESTAMPTZ   NOT NULL DEFAULT now()
updated_at     TIMESTAMPTZ   NOT NULL DEFAULT now()
```

### `business_notes`
```sql
id         UUID        PK
user_id    UUID        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE
content    TEXT        NOT NULL  -- max 2000 caracteres (validado en API)
color      TEXT        NOT NULL DEFAULT 'yellow'
           -- yellow | blue | green | red | purple
is_pinned  BOOLEAN     NOT NULL DEFAULT false
created_at TIMESTAMPTZ NOT NULL DEFAULT now()
updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
```

RLS habilitada en las 3 tablas con política `FOR ALL USING (auth.uid() = user_id)`.

---

## UX por pantalla

### `expenses/page.tsx`
- 3 stats: total mes (rojo), categoría mayor, top 3 categorías
- Selector mes ← → | Filtro por categoría (9 tabs: "Todas" + 8 cats)
- Tabla: descripción + proveedor + monto (rojo) + badge categoría + fecha
- Acciones editar/eliminar con `opacity-0 group-hover:opacity-100`
- Modal: slide-up móvil / centrado desktop, validación client + server

### `sales/page.tsx`
- 3 stats: total mes (teal), método top (con emoji + count), desglose por método
- Selector mes ← → | Filtro por método de pago (5 tabs: 💵💳🏦🔄)
- Tabla: descripción + monto (teal) + badge método + fecha
- Modal igual que expenses, con select de método de pago

### `inventory/page.tsx`
- 4 stats: productos activos, valor de stock total, stock bajo (≤5), sin stock (0)
- Buscador por nombre/categoría | Filtro activos/inactivos/todos
- Tabla: nombre, precio venta, costo, margen % (verde/naranja/rojo), stock badge, estado
- CTA "Gestionar productos" → `/dashboard/products`
- Banner ámbar si algún producto tiene `cost_price = 0`

### `notes/page.tsx`
- 2-4 stats: total notas, fijadas, top 2 colores con dot
- Filtro por color (6 tabs: "Todas" + 5 colores con dot)
- Grid masonry (`columns-1 sm:columns-2 lg:columns-3`)
- Pin toggle directo en tarjeta (sin modal) — optimistic update
- Modal: textarea + selector dots + toggle pin + contador chars

---

## Fase 2A — Bot conectado al inventario (2026-03-13)

### Qué se implementó
El bot web (widget embed) ahora consulta el inventario del dueño en tiempo real
antes de cada respuesta e inyecta los productos disponibles al system prompt.

### Archivos
| Archivo | Cambio |
|---------|--------|
| `lib/getInventoryContext.ts` | **Nuevo** — función reutilizable |
| `app/api/widget/[botId]/route.ts` | Reemplazado bloque inline por llamada a la función |

### `lib/getInventoryContext.ts`
```typescript
getInventoryContext(userId: string, supabase: SupabaseClient): Promise<string>
```
- Consulta `products` donde `status != inactive` AND `stock > 0`
- Límite: 30 productos, ordenados por nombre
- Devuelve `""` si no hay productos (bot funciona normal sin contexto)
- Errores son silenciosos (no interrumpen el flujo del bot)

### Formato inyectado al system prompt
```
Inventario disponible hoy:
- Café (stock: 50 unidades, precio: $2.50)
- Agua (stock: 30 unidades, precio: $1.00)
Si preguntan por algo que no está en la lista, di que no está disponible.
```

### Comportamiento del bot
- "¿tienen café?" → responde con stock real
- "¿cuánto cuesta X?" → responde con precio real
- "¿qué hay disponible?" → lista productos con stock > 0
- Producto agotado (stock = 0) → no aparece, bot dice que no está disponible

---

## Estado de tablas en Supabase (2026-03-13)

| Tabla | Estado | Notas |
|-------|--------|-------|
| `business_expenses` | ✅ Creada | Schema + RLS + trigger |
| `business_sales` | ✅ Creada | Schema + RLS + trigger |
| `business_notes` | ✅ Creada | Schema + RLS + trigger |
| `products` | ✅ Creada | Incluye `cost_price`, `status` CHECK, RLS, índices, trigger |
| `invoices` | ✅ Creada | JSONB items, totales auto-calculados, RLS, índice único `(user_id, invoice_number)` |

### Schema `products` (columnas clave)
```sql
price       NUMERIC(10,2)  -- precio de venta
cost_price  NUMERIC(10,2)  -- para calcular margen de ganancia
stock       INTEGER        -- unidades disponibles
status      TEXT           -- 'active' | 'inactive' | 'out_of_stock'
```

### Schema `invoices` (columnas clave)
```sql
invoice_number  TEXT    -- auto-generado: INV-YYYY-NNNN
items           JSONB   -- [{ quantity, unit_price, description }]
subtotal / tax_amount / total  NUMERIC  -- calculados en API
status  TEXT  -- 'draft' | 'sent' | 'paid' | 'cancelled'
```

---

## Fix: mismatch p.active → p.status (2026-03-13)

**Archivo:** `app/dashboard/business/inventory/page.tsx`

La interfaz usaba `active: boolean` pero la API de products devuelve
`status: "active" | "inactive" | "out_of_stock"`. Corregido:

| Antes | Después |
|-------|---------|
| `active: boolean` | `status: "active" \| "inactive" \| "out_of_stock"` |
| `p.active` | `p.status === "active"` |
| `!p.active` | `p.status !== "active"` |
| Badge hardcoded Activo/Inactivo | `STATUS_MAP` con 3 estados + colores |

---

## Próximos pasos sugeridos

| Prioridad | Tarea | Notas |
|-----------|-------|-------|
| ✅ Completado | Ejecutar schema en Supabase | `business_expenses`, `business_sales`, `business_notes`, `products`, `invoices` |
| ✅ Completado | `cost_price` en `products` | Incluido desde creación de la tabla |
| ✅ Completado | Bot conectado al inventario | `lib/getInventoryContext.ts` — stock en tiempo real |
| 🟡 Fase 2B | WhatsApp Business API | Bot responde en WhatsApp con el mismo inventario |
| 🟡 Sesión futura | Reportes mensuales en PDF | Pro/Premium — usa lib/pdf o similar |
| 🟡 Sesión futura | Export CSV de gastos/ventas | Pro/Premium |
| 🟡 Sesión futura | Gráficas de tendencia en overview | Últimos 6 meses (SVG inline o canvas) |
| 🟢 Sesión futura | Plan Business $79 | Si se decide crear plan dedicado |
| 🟢 Sesión futura | Límites de plan aplicados | Ej. max 10 notas en free |
