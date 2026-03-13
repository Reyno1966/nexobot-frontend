# NEXOBOT_MASTER.skill.md
> Memoria permanente del proyecto — actualizar al final de cada sesión.
> Última actualización: 2026-03-13

---

## 1. Stack completo

### Frontend / Framework
| Tecnología | Versión | Notas |
|---|---|---|
| Next.js | 15.5 | App Router — NO Pages Router |
| TypeScript | 5.x | Strict mode, `no any` |
| Tailwind CSS | v4 | Sin shadcn/ui, sin lucide-react |
| React | 19 | Server + Client components |

### Backend / Infra
| Tecnología | Uso |
|---|---|
| Supabase | Auth + PostgreSQL + Storage + RLS |
| Stripe | Pagos, suscripciones, webhooks |
| Vercel | Deploy automático desde `main` |
| OpenAI | gpt-4o-mini vía `lib/openai.ts` |
| Resend | Emails transaccionales vía `lib/email.ts` |

### Importante — NO instalado
- ❌ shadcn/ui
- ❌ lucide-react
- ❌ recharts
- ❌ zod
- ❌ react-hook-form
- ✅ SVG inline para iconos
- ✅ Tailwind puro para UI

---

## 2. Estructura de carpetas clave

```
nexobot-frontend/
├── app/
│   ├── page.tsx                    ← Landing principal (español, raíz "/")
│   ├── layout.tsx                  ← Layout global (Google Ads tag, fuentes)
│   ├── globals.css                 ← Tailwind v4 + variables CSS globales
│   │
│   ├── [locale]/page.tsx           ← Landing localizada (en, it, fr, de, pt, ar, zh, ja, ru, ko, nl, tr, id)
│   │
│   ├── auth/                       ← Login, signup, reset, update-password
│   ├── dashboard/
│   │   ├── layout.tsx              ← Sidebar + topbar móvil
│   │   ├── page.tsx                ← Analíticas + onboarding
│   │   ├── bots/
│   │   │   ├── page.tsx            ← Lista de bots
│   │   │   └── [id]/page.tsx       ← Config + apariencia + test + embed
│   │   ├── conversations/page.tsx
│   │   ├── appointments/page.tsx
│   │   ├── products/page.tsx       ← Inventario (también usado por Business)
│   │   ├── invoices/page.tsx
│   │   ├── billing/page.tsx        ← Suscripción y planes
│   │   ├── settings/page.tsx       ← Perfil de empresa
│   │   └── business/
│   │       ├── layout.tsx          ← Sub-nav del módulo business
│   │       ├── page.tsx            ← Overview KPIs
│   │       ├── expenses/page.tsx
│   │       ├── sales/page.tsx
│   │       ├── notes/page.tsx
│   │       └── inventory/page.tsx  ← Alias → /dashboard/products
│   │
│   ├── api/
│   │   ├── chat/route.ts           ← Motor principal del bot (OpenAI + inventario)
│   │   ├── bots/[id]/route.ts      ← CRUD de bots
│   │   ├── analytics/              ← Stats del dashboard
│   │   ├── appointments/           ← Citas agendadas por bots
│   │   ├── conversations/          ← Historial de conversaciones
│   │   ├── products/               ← Catálogo / inventario
│   │   ├── invoices/               ← Facturas
│   │   ├── profile/                ← Perfil de empresa
│   │   ├── notifications/          ← Centro de notificaciones
│   │   ├── business/
│   │   │   ├── expenses/route.ts       ← GET, POST
│   │   │   ├── expenses/[id]/route.ts  ← PUT, DELETE
│   │   │   ├── sales/route.ts
│   │   │   ├── sales/[id]/route.ts
│   │   │   ├── notes/route.ts
│   │   │   └── notes/[id]/route.ts
│   │   └── stripe/
│   │       ├── create-checkout-session/route.ts
│   │       ├── verify-session/route.ts
│   │       └── webhook/route.ts    ← FUENTE DE VERDAD de suscripciones
│   │
│   ├── checkout/                   ← Success/cancel pages
│   ├── widget/                     ← Iframe embebible del bot
│   └── book/                       ← Página pública de agendamiento
│
├── components/
│   ├── landing/
│   │   ├── LandingPage.tsx         ← Componente único parametrizable (t: LandingT)
│   │   ├── DemoChat.tsx            ← Demo interactivo (en español, hardcoded)
│   │   └── PricingSection.tsx      ← Sección precios (en español, hardcoded)
│   └── dashboard/
│       ├── Sidebar.tsx
│       ├── AlertsPanel.tsx
│       └── NotificationToast.tsx
│
├── lib/
│   ├── auth.ts                     ← getAuth() — SIEMPRE usar en API routes privadas
│   ├── plans.ts                    ← PLAN_LIMITS, PLAN_PRICES, PRICE_TO_PLAN
│   ├── openai.ts                   ← callOpenAI(), AI_MODEL, límites de tokens
│   ├── getInventoryContext.ts      ← Contexto de inventario para el bot
│   ├── appointments.ts             ← tryExtractAppointment() — extrae citas vía GPT
│   ├── email.ts                    ← Emails transaccionales (Resend)
│   ├── gtag.ts                     ← Google Ads conversions (trackSignUp, trackPurchase)
│   ├── stripe.ts                   ← Cliente Stripe
│   ├── notifications.ts            ← Sistema de notificaciones del dashboard
│   ├── resend.ts                   ← Cliente Resend
│   ├── supabaseClient.js           ← Cliente Supabase público (browser)
│   └── i18n/
│       └── landing.ts              ← LandingT interface + 13 traducciones
│
├── middleware.ts                   ← Protección de rutas + detección de idioma
├── next.config.ts                  ← Security headers, imágenes remotas, ESLint
├── business-module-schema.sql      ← DDL del Business Module (ejecutar en Supabase)
├── NEXOBOT_MASTER.skill.md         ← Este archivo
└── NEXOBOT_BUSINESS.skill.md       ← Historial detallado del Business Module
```

---

## 3. Colores del sistema

```
Principal:      #2CC5C5   (teal)
Secundario:     #F5A623   (naranja)
Fondo oscuro:   from-[#041414] to-[#062828]
Cards:          bg-white rounded-2xl border border-gray-100 shadow-sm
Fondo dash:     bg-gray-50
Spinner:        border-[#2CC5C5]
```

Gradiente de marca (botones, headers de email):
```css
background: linear-gradient(to right, #2CC5C5, #F5A623)
```

---

## 4. Patrones de código

### Auth en API Routes — OBLIGATORIO
```typescript
import { getAuth } from "@/lib/auth";

export async function GET(req: Request) {
  const auth = await getAuth();
  if (!auth) return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  const { supabase, userId } = auth;
  // Siempre verificar ownership antes de modificar:
  // .eq("user_id", userId)
}
```

`getAuth()` resuelve el problema de tokens expirados (Supabase expira el access token cada 1 hora):
1. Intenta el access token actual
2. Si falla, usa el refresh token y actualiza las cookies

### Páginas del dashboard — patrón estándar
```typescript
"use client";
import { useState, useEffect } from "react";

export default function MiPagina() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/mi-recurso")
      .then(r => r.json())
      .then(setData)
      .catch(() => setError("Error al cargar"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="flex items-center justify-center h-64">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#2CC5C5]" />
  </div>;
  // ...
}
```

Reglas de páginas:
- Todas son `"use client"` con `useState` + `useEffect` + `fetch`
- **NO Server Actions** — todas las mutaciones van por API Routes
- Estado siempre: loading → success → error
- Área de contenido: `p-6 max-w-6xl mx-auto`
- Layout: `lg:ml-64` (sidebar fijo) + `pt-[56px] lg:pt-0` (topbar móvil)

### Verificación de límites de plan — en servidor
```typescript
const plan = subscription?.plan || "free";
const limits = PLAN_LIMITS[plan];
if (limits.bots !== -1 && botCount >= limits.bots) {
  return NextResponse.json({ error: "Límite de plan alcanzado" }, { status: 403 });
}
```
**Nunca verificar límites solo en el cliente.**

---

## 5. Tablas Supabase

### Tablas base
| Tabla | Descripción | RLS |
|---|---|---|
| `auth.users` | Usuarios (Supabase Auth) | ✅ nativo |
| `profiles` | Datos de empresa del usuario | ✅ |
| `bots` | Bots configurados | ✅ |
| `conversations` | Conversaciones con visitantes | ✅ |
| `messages` | Mensajes individuales | ✅ |
| `appointments` | Citas agendadas por bots | ✅ |
| `subscriptions` | Estado de suscripción activa | ✅ |
| `products` | Catálogo / inventario (+`cost_price`) | ✅ |
| `invoices` | Facturas del negocio | ✅ |

### Business Module (nuevas)
| Tabla | Descripción | RLS |
|---|---|---|
| `business_expenses` | Gastos y compras | ✅ |
| `business_sales` | Ventas del día / caja | ✅ |
| `business_notes` | Notas rápidas y recordatorios | ✅ |

**Regla de oro**: RLS activo en TODAS las tablas. Siempre `.eq("user_id", userId)`.

### Columna extra en tabla existente
```sql
-- products: margen de ganancia
ALTER TABLE products ADD COLUMN cost_price NUMERIC(10,2);
```

---

## 6. Planes y precios

| Plan | Bots | Msgs/mes | Mensual | Anual | Equiv. mensual |
|---|---|---|---|---|---|
| free | 1 | 100 | — | — | — |
| Starter | 3 | 5.000 | $14 | $134 | $11 |
| Pro | 10 | 20.000 | $29 | $278 | $23 |
| Premium | ∞ | ∞ | $49 | $470 | $39 |

`PLAN_LIMITS.Premium = { bots: -1, messages: -1 }` → `-1` significa ilimitado.

### Add-ons (pago único)
| Servicio | Precio | Stripe price ID |
|---|---|---|
| Personalización Avanzada | $49 | `price_1T8ehkRap0JkQNsmtky7j7ZL` |
| Automatizaciones Avanzadas | $79 | `price_1T8f2CRap0JkQNsmyzuyUvU4` |
| Integración Sistemas Externos | $99 | `price_1T8eyARap0JkQNsmWVnTTioZ` |

---

## 7. Módulos construidos

### Core — Bot AI
- `app/api/chat/route.ts` — Motor principal
  - Verifica límites de mensajes del plan
  - Inyecta contexto de inventario vía `getInventoryContext()`
  - Llama a GPT con `callOpenAI()` (3 reintentos automáticos)
  - Extrae citas con `tryExtractAppointment()`
  - Envía emails de notificación (leads, citas, límites)
  - Contador mensual con auto-reset
- `app/widget/` — Iframe embebible
- `app/book/` — Página pública de agendamiento

### Fase 2A — Bot conectado al inventario
**Archivo**: `lib/getInventoryContext.ts`
```typescript
export async function getInventoryContext(userId, supabase): Promise<string>
```
- Consulta `products` donde `status != inactive` y `stock > 0`
- Límite: 30 productos más relevantes
- Devuelve string formateado para inyectar al system prompt
- Si falla o no hay productos → devuelve `""` (bot funciona igual)
- Se llama en `app/api/chat/route.ts` antes de cada llamada a GPT

### Business Module (2026-03-12)
**Rutas dashboard**:
- `/dashboard/business` — Overview con KPIs (ingresos, gastos, margen)
- `/dashboard/business/expenses` — CRUD completo de gastos
- `/dashboard/business/sales` — Ventas del día
- `/dashboard/business/notes` — Notas rápidas
- `/dashboard/business/inventory` — Alias de `/dashboard/products`

**APIs**:
- `GET/POST /api/business/expenses`
- `PUT/DELETE /api/business/expenses/[id]`
- `GET/POST /api/business/sales`
- `PUT/DELETE /api/business/sales/[id]`
- `GET/POST /api/business/notes`
- `PUT/DELETE /api/business/notes/[id]`

**Schema**: `business-module-schema.sql` en raíz del proyecto.

### Landing i18n — 13 idiomas (2026-03-13)
**Arquitectura**:
- `components/landing/LandingPage.tsx` — componente único parametrizable
- `lib/i18n/landing.ts` — tipo `LandingT` + 13 traducciones
- Cada `app/[locale]/page.tsx` = 4 líneas

```typescript
// Ejemplo: app/en/page.tsx
import LandingPage from "@/components/landing/LandingPage";
import { en } from "@/lib/i18n/landing";
export default function HomeEN() {
  return <LandingPage t={en} locale="en" />;
}
```

**Idiomas completos** (13/13):
`es` (raíz), `en`, `it`, `fr`, `de`, `pt`, `ar` (RTL), `zh`, `ja`, `ru`, `ko`, `nl`, `tr`, `id`

**RTL**: árabe detectado con `dir={locale === "ar" ? "rtl" : "ltr"}` en el `<main>`.

**Prop `{year}` en copyright**: `t.footer.copyright.replace("{year}", String(year))` en render.

---

## 8. Emails transaccionales (lib/email.ts)

| Función | Trigger | Asunto |
|---|---|---|
| `sendWelcomeEmail` | Registro exitoso | Bienvenida + primeros pasos |
| `sendLimitAlertEmail` | 80% de mensajes usados | Alerta de límite |
| `sendLimitReachedEmail` | 100% de mensajes | Bot pausado |
| `sendNewLeadEmail` | Nuevo visitante en bot | Notificación de lead |
| `sendLeadCaptureEmail` | Bot captura email/teléfono | Datos de contacto |
| `sendAppointmentEmail` | Cita agendada | Detalles de la cita |

Todos usan `Resend` desde `no-reply@nexobot.net`.
Si `RESEND_API_KEY` no está configurado, retornan silenciosamente (no rompen el flujo).

---

## 9. Google Ads (lib/gtag.ts)

**Tag ID**: `AW-1042824233`

| Función | Dónde se llama | Evento |
|---|---|---|
| `trackSignUp()` | `app/auth/signup` tras crear cuenta | `sign_up` + conversión Ads |
| `trackBeginCheckout()` | `app/dashboard/billing` al clic Suscribirse | `begin_checkout` |
| `trackPurchase()` | `app/checkout/success` tras confirmar pago | `purchase` + conversión Ads |

---

## 10. Decisiones de arquitectura

### ¿Por qué API Routes y no Server Actions?
- **Separación clara**: La UI es 100% cliente (`"use client"`), la lógica es 100% servidor (API Routes).
- **Reutilizabilidad**: Las APIs las puede consumir el widget embebido, futuras apps móviles o terceros.
- **Debugging más fácil**: Se pueden probar con curl/Postman sin montar la UI.
- **Consistencia**: Todo el equipo sigue el mismo patrón sin excepciones.

### Cómo funciona el middleware de i18n
```
Request a "/"
  → middleware.ts detecta Accept-Language header
  → Si idioma soportado (en/pt/fr/it/de/nl/ar/zh/ja/ru/ko/tr/id) → redirect a /[locale]
  → Si es español o no detectado → permanece en "/" (landing en español)

Request a "/dashboard" sin cookie de auth
  → middleware.ts verifica sb-access-token + sb-refresh-token
  → Si ausentes → redirect a /auth/login
  → Si presentes → pasa NextResponse.next()
```

No se usa el i18n nativo de Next.js — es detección manual via header HTTP.
**Ventaja**: control total, sin routing phantom de Next.js.

### Cómo funciona getInventoryContext()
```
app/api/chat/route.ts recibe mensaje del visitante
  → getAuth() verifica al dueño del bot
  → getInventoryContext(userId, supabase) consulta products
     → filtra status != inactive && stock > 0
     → límite 30 productos ordenados por nombre
     → devuelve string formateado o "" si vacío
  → String se inyecta al final del system prompt del bot
  → Bot puede responder sobre disponibilidad y precios en tiempo real
```

**Diseño defensivo**: si falla la consulta → `catch { return "" }` → bot funciona sin inventario.

### Stripe webhook = fuente de verdad
`app/api/stripe/webhook/route.ts` actualiza la tabla `subscriptions`.
**Nunca confiar en el estado del cliente para saber si el usuario tiene plan activo.**
Siempre leer `subscriptions` desde Supabase con `getAuth()`.

---

## 11. Variables de entorno necesarias

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Stripe
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=

# OpenAI
OPENAI_API_KEY=

# Resend
RESEND_API_KEY=

# App
NEXT_PUBLIC_APP_URL=https://nexobot.net
```

---

## 12. Deploy

- **Plataforma**: Vercel
- **Rama de producción**: `main` — Vercel despliega automáticamente al hacer push a `main`
- **Ramas de trabajo**: `claude/[nombre]` — nunca llegan a producción solas

### Flujo de trabajo con Claude Code (worktrees)
```
1. Claude trabaja en rama claude/[nombre] (worktree aislado)
2. TypeScript pasa sin errores (npx tsc --noEmit)
3. git commit en el worktree
4. git push origin claude/[nombre]
5. En el repo principal: git merge origin/claude/[nombre] && git push origin main
6. Vercel detecta el push a main y despliega automáticamente
```

**⚠️ CRÍTICO**: Si no se hace merge a main, Vercel no despliega. Siempre terminar sesiones con el merge.

---

## 13. Errores conocidos y cómo evitarlos

### Error 1: Overflow de tokens de Claude Code
**Síntoma**: Claude Code se queda sin contexto a mitad de una tarea grande.
**Causa**: Intentar hacer demasiado en una sola sesión (ej: 13 idiomas a la vez).
**Solución**: Dividir en grupos de 5-6 items por sesión. Confirmar cada grupo antes del siguiente.

### Error 2: Bash heredoc con `${variable^^}`
**Síntoma**: `bad substitution` en zsh/sh.
**Causa**: `${var^^}` (uppercase) es sintaxis bash 4+, no funciona en zsh o sh.
**Solución**: Usar `printf` individual por cada caso en lugar de loops con heredoc.
```bash
# ❌ Falla en zsh
for locale in en it; do
  printf "...${locale^^}..." > app/$locale/page.tsx
done

# ✅ Correcto
printf '...HomeEN...' > app/en/page.tsx
printf '...HomeIT...' > app/it/page.tsx
```

### Error 3: Write tool en archivo existente
**Síntoma**: Error al usar Write tool en un archivo que ya existe en el worktree.
**Solución**: Usar `Edit` para modificaciones, o `Bash printf` para sobreescribir.

### Error 4: Tokens expirados de Supabase
**Síntoma**: API routes devuelven 401 intermitentes.
**Causa**: Supabase expira el access token cada 1 hora.
**Solución**: `getAuth()` ya lo maneja con refresh automático. Nunca crear clientes Supabase manualmente en API routes.

### Error 5: Emojis en detección de bullets i18n
**Síntoma**: Los bullets del demo tenían emojis hardcodeados en el texto y se detectaban por texto frágil.
**Solución**: Constante `DEMO_BULLET_ICONS = ["⚡","🧠","🎨","📲"]` indexada por posición, independiente del texto.

### Error 6: Merge olvidado antes de cerrar sesión
**Síntoma**: Los cambios están en la rama de Claude pero no en producción (Vercel no despliega).
**Solución**: Siempre como último paso: `git merge origin/claude/[rama] && git push origin main` desde el repo principal.

---

## 14. Pendientes próximas sesiones

### Alta prioridad
| Tarea | Descripción | Notas |
|---|---|---|
| Fase 2B — WhatsApp Business API | Bot responde en WhatsApp con inventario en tiempo real | Requiere Meta Business account + webhook |
| Reportes mensuales PDF | Pro/Premium — resumen de gastos, ventas, margen | Usar lib/pdf o Puppeteer |
| Export CSV | Gastos y ventas exportables | Pro/Premium |

### Media prioridad
| Tarea | Descripción | Notas |
|---|---|---|
| Gráficas de tendencia | Overview business — últimos 6 meses | SVG inline o canvas (sin recharts) |
| Plan Business $79 | Si se decide crear plan dedicado para el Business Module | — |
| Resumen semanal por email | Email automático los lunes con stats de la semana | Usar Resend + cron |

### Baja prioridad / Futuro
| Tarea | Descripción |
|---|---|
| DemoChat en múltiples idiomas | Actualmente hardcoded en español |
| PricingSection en múltiples idiomas | Actualmente hardcoded en español |
| App móvil | React Native o PWA consumiendo las mismas API Routes |

---

## 15. Filosofía y estándares de calidad

**Referentes de producto**: Intercom, Tidio, Crisp, ManyChat, Botpress.

### Reglas de oro (nunca romper)
1. `getAuth()` en **TODAS** las rutas API privadas — sin excepción
2. Verificar `user_id` antes de modificar cualquier recurso
3. UI: loading → success → error — siempre los tres estados
4. Validar inputs en servidor antes de tocar BD
5. Límites de plan se verifican en servidor, nunca solo en cliente
6. Stripe webhook = fuente de verdad de suscripciones
7. TypeScript estricto — `no any` nunca
8. RLS activo en todas las tablas de Supabase
9. Merge a main siempre al final de cada sesión de trabajo
10. Dividir tareas grandes en grupos para evitar overflow de contexto
