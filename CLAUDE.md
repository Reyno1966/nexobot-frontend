# NexoBot — Guía de Trabajo para Claude Code

## Stack
- **Framework**: Next.js 15.5 (App Router), TypeScript, Tailwind CSS v4
- **Base de datos / Auth**: Supabase (`@supabase/ssr`, `@supabase/supabase-js`)
- **Pagos**: Stripe + webhooks
- **IA**: OpenAI gpt-4o-mini via `lib/openai.ts`
- **Email**: Resend via `lib/email.ts`
- **Deploy**: Vercel

> **No está instalado**: shadcn/ui, lucide-react, recharts, zod, react-hook-form.
> Usar Tailwind puro y SVG inline como el resto del proyecto.

---

## Archivos críticos
| Archivo | Propósito |
|---|---|
| `lib/auth.ts` → `getAuth()` | Auth con auto-refresh — SIEMPRE en rutas API privadas |
| `lib/plans.ts` → `PLAN_PRICES`, `PLAN_LIMITS`, `ADDON_PRICES` | Fuente de verdad de planes y precios |
| `lib/openai.ts` → `callOpenAI()` | Llamadas a GPT con reintentos y límites |
| `lib/appointments.ts` | Extracción de citas vía GPT |
| `lib/email.ts` | Emails transaccionales (Resend) |
| `middleware.ts` | Protección de rutas + detección de idioma |

---

## Colores del sistema
```
Principal:    #2CC5C5
Secundario:   #F5A623
Fondo oscuro: from-[#041414] to-[#062828]
Cards:        bg-white rounded-2xl border border-gray-100 shadow-sm
Fondo dashboard: bg-gray-50
```

---

## Patrones de arquitectura

### Auth en API Routes
```typescript
import { getAuth } from "@/lib/auth";

export async function GET(req: Request) {
  const auth = await getAuth();
  if (!auth) return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  const { supabase, userId } = auth;
  // ...
}
```

### Páginas del dashboard
- Todas son `"use client"` con `useState` + `useEffect` + `fetch`
- **No Server Actions** — todas las mutaciones van por API Routes
- Loading: spinner con border-[#2CC5C5]
- Área de contenido: `p-6 max-w-6xl mx-auto`

### Dashboard Layout
- Sidebar fijo: `lg:ml-64`
- Top bar móvil: `pt-[56px] lg:pt-0`
- Fondo: `bg-gray-50`

---

## Planes y límites
| Plan    | Bots | Msgs/mes | Precio mensual |
|---------|------|----------|----------------|
| free    | 1    | 100      | —              |
| Starter | 3    | 5,000    | $14            |
| Pro     | 10   | 20,000   | $29            |
| Premium | ∞    | ∞        | $49            |

---

## Tablas Supabase
`bots`, `conversations`, `messages`, `appointments`, `subscriptions`, `profiles`, `products`, `invoices`

### Business Module (nuevas — ver `business-module-schema.sql`)
`business_expenses`, `business_sales`, `business_notes`

---

## Rutas del dashboard
```
/dashboard                    → analíticas + onboarding
/dashboard/bots               → gestión de bots
/dashboard/bots/[id]          → config, apariencia, test, embed
/dashboard/conversations      → historial de conversaciones
/dashboard/appointments       → citas agendadas
/dashboard/products           → inventario de productos
/dashboard/invoices           → facturas
/dashboard/billing            → suscripción y planes
/dashboard/settings           → perfil de empresa
```

---

## Business Module

### Qué es
Módulo de gestión de negocio integrado en el dashboard de NexoBot.
Permite a cada cliente gestionar gastos, ventas, inventario, facturas y notas
sin salir de la plataforma.

### Rutas
```
/dashboard/business           → resumen general del módulo
/dashboard/business/expenses  → gastos y compras
/dashboard/business/sales     → ventas del día (caja)
/dashboard/business/notes     → notas rápidas y recordatorios
```
> Inventario → reusa `/dashboard/products` (tabla `products`)
> Facturas   → reusa `/dashboard/invoices` (tabla `invoices`)

### Tablas nuevas
| Tabla | Descripción |
|---|---|
| `business_expenses` | Gastos y compras del negocio |
| `business_sales` | Ventas del día / caja diaria |
| `business_notes` | Notas rápidas y recordatorios |

### Extensiones a tablas existentes
| Tabla | Columna agregada | Motivo |
|---|---|---|
| `products` | `cost_price NUMERIC(10,2)` | Calcular margen de ganancia |

### Acceso por plan
| Plan | Acceso |
|---|---|
| free | Gastos, inventario básico, ventas del día, notas (limitado) |
| Pro | Acceso completo: + facturas PDF, reportes mensuales |
| Premium | Igual que Pro |

### APIs
```
GET/POST   /api/business/expenses
PUT/DELETE /api/business/expenses/[id]
GET/POST   /api/business/sales         (pendiente)
PUT/DELETE /api/business/sales/[id]    (pendiente)
GET/POST   /api/business/notes         (pendiente)
PUT/DELETE /api/business/notes/[id]    (pendiente)
```

### Estado del módulo (2026-03-12)
- ✅ Schema SQL listo (`business-module-schema.sql`)
- ✅ API expenses (GET, POST, PUT, DELETE)
- ✅ `/dashboard/business/expenses` — página funcional completa
- ✅ `/dashboard/business` — overview con KPIs
- ✅ `/dashboard/business/layout.tsx` — sub-navegación
- 🟡 `/dashboard/business/sales` — placeholder (próxima sesión)
- 🟡 `/dashboard/business/notes` — placeholder (próxima sesión)
- ⭕ Reportes mensuales — sesión futura
- ⭕ Plan Business $79 — sesión futura
- ⭕ Bot conectado al inventario — sesión futura

---

## Google Ads — Conversiones activas (AW-1042824233)
- `sign_up` → `/auth/signup` al crear cuenta exitosamente
- `begin_checkout` → `/dashboard/billing` al hacer clic en Suscribirse
- `purchase` → `/checkout/success` al confirmar pago

Helper centralizado en `lib/gtag.ts`

---

## Reglas de oro
1. `getAuth()` en TODAS las rutas API privadas (auto-refresh incluido)
2. Verificar `user_id` antes de modificar cualquier recurso
3. Loading → success → error en UI
4. Validar inputs en servidor antes de tocar BD
5. Límites de plan en servidor, nunca solo en cliente
6. Stripe webhook = fuente de verdad de suscripciones
7. No usar `any` en TypeScript
