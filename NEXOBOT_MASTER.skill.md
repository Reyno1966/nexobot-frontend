# NEXOBOT_MASTER.skill.md
> Memoria permanente del proyecto — actualizar al final de cada sesión.
> Última actualización: 2026-03-20 (pricing v3 — Stripe IDs actualizados, plan Premium $79)

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
│   │   ├── whatsapp/
│   │   │   ├── webhook/route.ts    ← GET (challenge Meta) + POST (mensajes entrantes)
│   │   │   ├── connections/route.ts ← GET/POST/DELETE conexiones WA por bot
│   │   │   └── verify/route.ts     ← POST: valida token+phoneNumberId contra Meta Graph API
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
│   ├── processBotMessage.ts        ← Motor central del bot (reutilizable, sin cookies)
│   ├── whatsapp.ts                 ← sendWhatsAppMessage, verifyWebhookSignature
│   └── i18n/
│       └── landing.ts              ← LandingT interface + 13 traducciones
│
├── middleware.ts                   ← Protección de rutas + detección de idioma + rate limiting auth
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

### WhatsApp Integration (nueva)
| Tabla | Descripción | RLS |
|---|---|---|
| `whatsapp_connections` | Vincula bot ↔ phone_number_id de Meta | ✅ |

**Schema**: `whatsapp-schema.sql` en raíz del proyecto.

**Regla de oro**: RLS activo en TODAS las tablas. Siempre `.eq("user_id", userId)`.

### Columna extra en tabla existente
```sql
-- products: margen de ganancia
ALTER TABLE products ADD COLUMN cost_price NUMERIC(10,2);
```

---

## 6. Planes y precios

> Versión v3 — 2026-03-20. Stripe price IDs actualizados (`price_1TCy*`).

| Plan | Bots | Msgs/mes | Mensual | Anual | Equiv. mensual |
|---|---|---|---|---|---|
| free | 1 | 100 | — | — | — |
| Starter | 2 | 1.000 | $19 | $182 | $15 |
| Pro | 5 | 5.000 | $39 | $374 | $31 |
| Premium | ∞ | ∞ | $79 | $778 | $65 |

`PLAN_LIMITS.Premium = { bots: -1, messages: -1 }` → `-1` significa ilimitado.
`PLAN_LIMITS.Business` existe como alias legacy → apunta a los mismos valores que Premium.

### Stripe price IDs v3 (activos)
| Plan | Ciclo | Price ID |
|---|---|---|
| Starter | mensual | `price_1TCyOpRap0JkQNsmITpDzS3K` |
| Starter | anual | `price_1TCyWDRap0JkQNsmF2TqoFIh` |
| Pro | mensual | `price_1TCyZtRap0JkQNsmgI7TTCsN` |
| Pro | anual | `price_1TCyd3Rap0JkQNsmkNvp1VvQ` |
| Premium | mensual | `price_1TCyjDRap0JkQNsmsD2sNoh7` |
| Premium | anual | `price_1TCylLRap0JkQNsm2rjF94Ny` |

### Add-ons (pago único) — v3
| Servicio | Precio | Stripe price ID |
|---|---|---|
| Personalización Avanzada | $69 | `price_1TCzXvRap0JkQNsmZu8qpWIX` |
| Automatizaciones Avanzadas | $99 | `price_1TCzaERap0JkQNsmDF5hgJ75` |
| Integración Sistemas Externos | $149 | `price_1TCzdPRap0JkQNsmkZRPlJPC` |

### Legacy price IDs (mantener en PRICE_TO_PLAN para clientes existentes)
- v2 mensuales: `price_1T8eHgRap0JkQNsmxXKjK3IH` (Starter), `price_1T8eNZRap0JkQNsmeObpDc8j` (Pro), `price_1T8eRdRap0JkQNsmllSsPbVs` (Premium)
- v2 anuales: `price_1T8qkPRap0JkQNsm1MI5XoYm`, `price_1T8qndRap0JkQNsmswIpSK3M`, `price_1T8qr5Rap0JkQNsm8wzRX02G`
- v1 (legacy): `price_1T18BGRap0JkQNsmaUVhyNFr`, `price_1T15gVRap0JkQNsm59vukMuR`, `price_1T15jDRap0JkQNsmQRvEkpcm`

---

## 7. Módulos construidos

### Core — Bot AI
- `lib/processBotMessage.ts` — Motor central (extraído de chat/route, 2026-03-15)
  - Reutilizable desde `chat/route.ts`, `whatsapp/webhook/route.ts`, y futuras integraciones
  - Verifica límites de mensajes del plan
  - Inyecta contexto de inventario vía `getInventoryContext()`
  - Si `bot.agent_enabled` → usa `runAgentLoop()` con tool calling
  - Si no → `callOpenAI()` directo (3 reintentos automáticos)
  - Extrae citas con `tryExtractAppointment()`
  - Envía emails de alertas de límite
  - Contador mensual con auto-reset
  - **NO depende de cookies ni de getAuth()** — recibe userId y supabase listos
- `app/api/chat/route.ts` — Wrapper para dashboard/widget
  - Usa `getAuth()` + `processBotMessage()`
  - Guarda historial en conversación `dashboard-{userId}-{botId}`

### Agente AI con Tool Calling (2026-03-20)
**Archivo**: `lib/agentLoop.ts`

**Activación**: toggle "Agente AI" en `/dashboard/bots/[id]` → pestaña Config
- BD: `bots.agent_enabled BOOLEAN DEFAULT false`
- API: `PUT /api/bots/[id]` acepta y persiste `agent_enabled`

**Herramientas disponibles (BOT_TOOLS)**:
| Tool | Descripción |
|---|---|
| `get_inventory` | Inventario completo: nombre, precio, stock |
| `get_products` | Busca productos por nombre/categoría (ilike) |
| `search_appointments` | Consulta citas por fecha o visitante |
| `create_appointment` | Crea cita (previo check de duplicado por fecha+hora) |

**Flujo del loop**:
```
messages → openai.chat.completions.create({ tools: BOT_TOOLS, tool_choice: "auto" })
  → finish_reason === "stop"  → retorna reply final
  → finish_reason === "tool_calls" → executeTool() → push tool result → re-llama OpenAI
  → máx. 4 iteraciones (≈12s) para respetar timeout de 15s de Meta WhatsApp
  → fallback si se agotan iteraciones sin respuesta final
```

**Datos requeridos para tools**:
- `get_inventory` / `get_products` → filtra por `user_id`
- `search_appointments` / `create_appointment` → filtra por `bot_id`

**TypeScript note**: `ChatCompletionMessageToolCall` es union con `ChatCompletionMessageCustomToolCall`
→ guard obligatorio: `if (toolCall.type !== "function") continue;` antes de acceder a `.function`

### WhatsApp Integration (2026-03-15, debuggeado 2026-03-17, pipeline verificado 2026-03-18)
**Fase 2B — Bot responde en WhatsApp en tiempo real — ✅ 100% COMPLETADA**

**Archivos**:
- `lib/whatsapp.ts` → `sendWhatsAppMessage()`, `markWhatsAppMessageRead()`, `verifyWebhookSignature()`
- `app/api/whatsapp/webhook/route.ts` → GET (challenge) + POST (mensajes entrantes)
- `app/api/whatsapp/connections/route.ts` → GET/POST/DELETE para gestión desde el dashboard
- `whatsapp-schema.sql` → DDL de `whatsapp_connections`

**Datos de producción**:
```
URL webhook:      https://www.nexobot.net/api/whatsapp/webhook
VERIFY_TOKEN:     nexobot-verify-2024
phone_number_id:  875188135685843   (número de prueba Meta: +1 555 146 4450)
```

**Flujo**:
```
Usuario escribe en WhatsApp
  → Meta POST → /api/whatsapp/webhook
  → Verifica X-Hub-Signature-256 (WHATSAPP_APP_SECRET)
  → Busca conexión activa en whatsapp_connections (por phone_number_id)
  → Carga historial de conversación (session_id = whatsapp-{waPhone})
  → processBotMessage() → OpenAI → respuesta
  → sendWhatsAppMessage() → Meta → usuario
  → Guarda en conversations + messages
```

**Variables de entorno** (Vercel — administrador de plataforma):
```
WHATSAPP_VERIFY_TOKEN    — string secreto para el challenge de Meta (ej: nexobot-verify-2024)
WHATSAPP_APP_SECRET      — App Secret de Meta (para verificar firma HMAC-SHA256)
WHATSAPP_TOKEN           — OPCIONAL: token global de fallback si el cliente no configura el suyo
                           (desde 2026-03-20 cada cliente guarda su propio token en la BD)
```
> `WHATSAPP_PHONE_NUMBER_ID` ya no es necesaria como env var — se guarda por cliente en la BD.

**Requisito crítico — tabla whatsapp_connections**:
Para que el webhook procese mensajes, DEBE existir una fila activa con `wa_token` seteado:
```sql
INSERT INTO whatsapp_connections (user_id, bot_id, phone_number_id, display_phone, wa_token, active)
VALUES ('uuid-usuario', 'uuid-bot', '875188135685843', '15551464450', 'EAATZA...token', true);
-- wa_token DEBE tener el token permanente de Meta (empieza con EAAT...)
-- Si wa_token = NULL el código cae a WHATSAPP_TOKEN env var, pero SIEMPRE preferir guardarlo en BD
```

**Actualizar token en producción**:
```sql
UPDATE whatsapp_connections
SET wa_token = 'EAAT...token_permanente', updated_at = now()
WHERE phone_number_id = '875188135685843';
```

Sin esta fila (o con `wa_token = NULL` y sin `WHATSAPP_TOKEN` en Vercel), el webhook retorna 200 OK
pero no envía nada — el bot procesa con OpenAI pero la respuesta se pierde en silencio.

**Bug crítico resuelto (2026-03-18)**: `wa_token = NULL` en `whatsapp_connections` →
webhook aceptaba mensajes (200 OK), llamaba OpenAI, pero `sendWhatsAppMessage()` no tenía token
→ respuesta nunca llegaba al WhatsApp del usuario (fallo silencioso).
```sql
UPDATE whatsapp_connections SET wa_token = 'EAA...' WHERE phone_number_id = '875188135685843';
```
**Regla**: `wa_token` SIEMPRE debe estar en la BD. No depender solo de la env var `WHATSAPP_TOKEN`.

**Testing — diagnóstico por tiempo de respuesta**:
- `~7.5s` → flujo completo OK (Webhook → Supabase → OpenAI → Meta → WhatsApp ✅)
- `<1s` → fallo silencioso antes de OpenAI (revisar conexión, token, bot status)

**Pipeline verificado**: Meta → Webhook → Supabase → OpenAI → WhatsApp ✅

**Dashboard**: pestaña "📱 WhatsApp" en `/dashboard/bots/[id]`
- Formulario: Phone Number ID, Token de acceso permanente (password con show/hide), Número visible
- Badge "✓ configurado" si ya existe `wa_token` en BD (sin exponer el valor)
- Botón "Verificar conexión" → llama a `/api/whatsapp/verify` → Meta API → muestra displayName y número real
- Autocompletado de número visible desde el resultado de Meta
- Botones: Activar / Actualizar / Desactivar
- Instrucciones para registrar el webhook en Meta

**Multi-tenant (2026-03-20)**:
- Cada cliente guarda su propio `wa_token` en `whatsapp_connections.wa_token`
- La API GET devuelve `has_token: boolean` (nunca el token real)
- La API POST acepta `waToken` — si está vacío, no sobreescribe el token existente
- El webhook usa `wa_token` del cliente primero, fallback a env `WHATSAPP_TOKEN`
- `app/api/whatsapp/verify/route.ts` → verifica contra `graph.facebook.com/v19.0/{phoneNumberId}`

**Seguridad**:
- No usa `getAuth()` en el webhook (endpoint público para Meta)
- Verifica firma `X-Hub-Signature-256` con HMAC-SHA256 timing-safe
- Ignora eventos `status` (delivered/read) para evitar bucles
- Usa service role key de Supabase en el webhook
- `wa_token` nunca se devuelve en GET; solo `has_token: boolean`

**Testing con curl** (usar Python para HMAC — más confiable que bash):
```python
import hmac, hashlib, json, subprocess, time

APP_SECRET = "fb90acb8ed10f8a65e9609b9f783c60c"
PHONE_NUMBER_ID = "875188135685843"
FROM_PHONE = "41789027648"

payload = {
  "object": "whatsapp_business_account",
  "entry": [{"id": "123456789", "changes": [{"value": {
    "messaging_product": "whatsapp",
    "metadata": {"display_phone_number": "15550000000", "phone_number_id": PHONE_NUMBER_ID},
    "contacts": [{"profile": {"name": "Test"}, "wa_id": FROM_PHONE}],
    "messages": [{"from": FROM_PHONE, "id": f"wamid.test_{int(time.time())}",
                  "timestamp": str(int(time.time())), "type": "text", "text": {"body": "Hola"}}]
  }, "field": "messages"}]}]
}
body = json.dumps(payload, separators=(',', ':'))
sig = "sha256=" + hmac.new(APP_SECRET.encode(), body.encode(), hashlib.sha256).hexdigest()

subprocess.run(["curl", "-s", "-w", "\nHTTP: %{http_code} TIME: %{time_total}s",
  "-X", "POST", "https://www.nexobot.net/api/whatsapp/webhook",
  "-H", "Content-Type: application/json", "-H", f"X-Hub-Signature-256: {sig}", "-d", body])
# Respuesta esperada: {"ok":true} HTTP: 200 TIME: ~7.5s (confirma que OpenAI + Meta corrieron)
# Si TIME < 1s → algo falló silenciosamente antes de llegar a OpenAI
```

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

### UX — Modal de confirmación de borrado (2026-03-20)
`app/dashboard/bots/page.tsx`
- Reemplaza el `confirm()` nativo del browser por un modal propio centrado en pantalla
- Estado: `confirmDeleteId` + `confirmDeleteName`
- Función `handleDelete(bot)` → setea el estado del modal; `executeDelete()` → llama a la API
- Muestra el nombre del bot en negrita, botones Cancelar / Eliminar (rojo)

### Seguridad — Rate limiting en middleware (2026-03-20)
`middleware.ts` — sliding window in-memory por instancia Edge:
| Ruta | Límite |
|---|---|
| `POST /api/auth/signup` | 5 req / 15 min |
| `POST /api/auth/login` | 10 req / 15 min |
| `POST /api/auth/reset` | 3 req / 15 min |
- Devuelve `429` con `{ error }` JSON + `Retry-After: 900`
- Protege contra credential stuffing y abuso de endpoints de auth
- Escala actual: in-memory suficiente. Para multi-instancia → Upstash Redis

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

### Cómo funciona el middleware
```
Request POST a /api/auth/signup|login|reset
  → Rate limiting sliding-window in-memory (por instancia Edge):
     signup: 5 req / 15 min  |  login: 10 req / 15 min  |  reset: 3 req / 15 min
  → Si excede → 429 JSON { error } + Retry-After: 900
  → Si ok → continúa al siguiente check

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
**Nota rate limiting**: es per-Edge-instance. Suficiente para escala actual; para multi-instancia usar Upstash Redis.

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

# WhatsApp Cloud API (Meta)
WHATSAPP_VERIFY_TOKEN=          # string secreto que tú defines (ej: nexobot-verify-2024)
WHATSAPP_APP_SECRET=            # App Secret de la app Meta (para verificar firma HMAC-SHA256)
WHATSAPP_TOKEN=                 # OPCIONAL — fallback global si cliente no configura su propio token
# WHATSAPP_PHONE_NUMBER_ID ya no es necesaria — se guarda por cliente en whatsapp_connections

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

### Error 7: PricingSection hardcodeado en español en todos los locales (2026-03-16)
**Síntoma**: La sección de precios mostraba siempre texto en español sin importar el locale (`/en`, `/fr`, etc.).
**Causa raíz (triple falla)**:
1. `PricingSection()` no aceptaba ninguna prop — firma vacía
2. Todo el texto (desc, features, cta, toggle, badges) hardcodeado en el array `PLANS` del componente en español
3. `LandingT` no tenía key `pricingSection` — nunca se diseñó para i18n
4. `app/page.tsx` (landing raíz) también llamaba `<PricingSection />` sin prop — falla secundaria

**Solución**:
- Agrega `pricingSection` al tipo `LandingT` y traducciones en los 13 locales de `landing.ts`
- Refactoriza `PricingSection.tsx` para aceptar `t: PricingT`; price IDs y precios numéricos quedan en constantes internas
- `LandingPage.tsx` pasa `t={t.pricingSection}`; `app/page.tsx` importa `es` y pasa `t={es.pricingSection}`

**Regla aprendida**: Todo componente nuevo de la landing debe recibir prop `t` desde el inicio. Si no la recibe, el texto quedará hardcodeado en el idioma en que se escribió.

### Error 8: after() de Next.js no funciona en Vercel Serverless (2026-03-17)
**Síntoma**: Webhook responde 200 pero no se crean filas en Supabase. Los logs de Supabase no muestran ninguna query tras el POST.
**Causa**: `after()` de `next/server` NO completa callbacks en Vercel Serverless estándar. Vercel congela el contexto de ejecución al enviar la respuesta. `after()` requiere Vercel Fluid Compute (plan Enterprise) para funcionar de forma confiable.
**Solución**: Usar `await` directo en el POST handler. OpenAI responde en ~2-4s, dentro del límite de 15s de Meta:
```typescript
// ❌ Falla silenciosamente en Vercel Serverless
after(() => processEntries(payload.entry).catch(...));
return NextResponse.json({ ok: true });

// ✅ Correcto — await directo, Meta espera hasta 15s
await processEntries(payload.entry).catch((err) => {
  console.error("[WhatsApp Webhook] Error:", err);
});
return NextResponse.json({ ok: true });
```
**Archivo afectado**: `app/api/whatsapp/webhook/route.ts`

### Error 9: echo vs printf en HMAC-SHA256 para curl
**Síntoma**: curl devuelve 401 Unauthorized aunque el APP_SECRET es correcto.
**Causa**: `echo "$PAYLOAD"` agrega `\n` al final del string, cambiando el hash HMAC. El servidor computa el hash del payload sin `\n`, pero el cliente lo envía con `\n`.
**Solución**: Siempre usar `printf '%s'` para calcular firmas HMAC:
```bash
# ❌ Firma incorrecta
SIG="sha256=$(echo "$PAYLOAD" | openssl dgst -sha256 -hmac "$SECRET" | awk '{print $2}')"

# ✅ Firma correcta
SIG="sha256=$(printf '%s' "$PAYLOAD" | openssl dgst -sha256 -hmac "$SECRET" | awk '{print $2}')"
```

### Error 6: Merge olvidado antes de cerrar sesión
**Síntoma**: Los cambios están en la rama de Claude pero no en producción (Vercel no despliega).
**Solución**: Siempre como último paso: `git merge origin/claude/[rama] && git push origin main` desde el repo principal.

---

## 14. Pendientes próximas sesiones

### Alta prioridad
| Tarea | Descripción | Notas |
|---|---|---|
| ✅ Fase 2B — WhatsApp Business API | Completada 2026-03-15 | Ver sección "WhatsApp Integration" |
| ✅ WhatsApp self-service multi-tenant | Completado 2026-03-20 | Token por cliente, verify endpoint, has_token seguro |
| ✅ Pricing v3 — 4 planes + Stripe IDs | Completado 2026-03-20 | Free/$0, Starter/$19, Pro/$39, Premium/$79. IDs `price_1TCy*` |
| Reportes mensuales PDF | Pro/Premium — resumen de gastos, ventas, margen | Usar lib/pdf o Puppeteer |
| Export CSV | Gastos y ventas exportables | Pro/Premium |

### Media prioridad
| Tarea | Descripción | Notas |
|---|---|---|
| Gráficas de tendencia | Overview business — últimos 6 meses | SVG inline o canvas (sin recharts) |
| Resumen semanal por email | Email automático los lunes con stats de la semana | Usar Resend + cron |

### Baja prioridad / Futuro
| Tarea | Descripción |
|---|---|
| DemoChat en múltiples idiomas | Actualmente hardcoded en español |
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
