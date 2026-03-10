# Nexobot Frontend - Memory

## Preferencias de comunicación
- Siempre responder en español

## Proyecto
- Next.js 15 con App Router
- React 19
- TypeScript (strict mode)
- Tailwind CSS v4
- Supabase (auth con cookies: sb-access-token, sb-refresh-token)
- Stripe para pagos
- Resend para emails
- OpenAI integration

## Estructura de autenticación
- Middleware en `middleware.ts` protege rutas privadas
- Rutas públicas: landing pages con locales (/en, /pt, /fr, etc.), /auth, /api, /checkout, /privacy, /terms, /widget
- Redirige usuarios no autenticados a /auth/login
- Redirige usuarios autenticados que visitan /auth/* a /dashboard
- Detección automática de idioma en la raíz "/"

## Locales soportados
en, pt, fr, it, de, nl, ar, zh, ja, ru, ko, tr, id
El español es el idioma raíz (sin prefijo de locale)
