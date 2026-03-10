# /audit — NexoBot Professional Audit

Ejecuta una auditoría completa de la aplicación NexoBot siguiendo los estándares de las mejores plataformas SaaS del mercado (Intercom, Tidio, Crisp, ManyChat, Botpress).

## Instrucciones para Claude

Cuando el usuario ejecute `/audit`, debes:

1. Leer los archivos clave del proyecto (APIs, componentes, lib, middleware)
2. Evaluar cada área contra los estándares en `memory/philosophy.md`
3. Generar un reporte estructurado con: ✅ OK | ⚠️ Advertencia | 🔴 Error crítico
4. Proponer y aplicar los fixes automáticamente

### Áreas a auditar (en orden de prioridad):

#### 🔐 SEGURIDAD
- Todas las rutas API protegidas usan `getAuth()` con auto-refresh
- No hay credenciales en código fuente
- Headers CORS correctos en endpoints públicos (widget)
- Validación de parámetros en todas las rutas POST/PUT
- No hay inyección SQL posible (uso de ORM/Supabase parameterized)
- Rate limiting activo en endpoints críticos (/api/chat, /api/widget)

#### ⚡ RENDIMIENTO
- Consultas Supabase con `.select()` específico (no `select("*")` innecesario)
- No hay N+1 queries (joins correctos)
- Imágenes con `next/image` con tamaños correctos
- No hay re-renders innecesarios (useCallback, useMemo donde aplique)
- Carga paralela de datos con `Promise.all`

#### 🛡️ CONFIABILIDAD
- Todos los fetch tienen manejo de errores (`try/catch`)
- Estados de loading en todos los formularios
- Mensajes de error descriptivos para el usuario (nunca "Error desconocido")
- Fire & forget con `.catch(() => {})` en operaciones no críticas
- Reintentos automáticos en llamadas a OpenAI

#### 🎨 UX/UI (estándar Intercom/Tidio)
- Estados vacíos (empty states) con call-to-action en todas las páginas
- Feedback inmediato en acciones (loading, success, error)
- Confirmación antes de acciones destructivas (delete, cancel subscription)
- Responsive en mobile y desktop
- Accesibilidad: labels en formularios, botones con aria

#### 🔄 FLUJO DE DATOS
- Contadores de mensajes se incrementan correctamente
- Reset mensual automático funcionando
- Límites de plan aplicados en widget y dashboard
- Webhooks de Stripe manejan todos los eventos necesarios

#### 📧 COMUNICACIONES
- Emails de bienvenida, límites (80% y 100%), nuevos leads
- URLs en emails apuntan al dominio correcto (nexobot.net)
- Emails con diseño HTML profesional (no texto plano)

#### 🗃️ BASE DE DATOS
- Índices en columnas de filtros frecuentes (bot_id, user_id, created_at)
- Upsert con `onConflict` correcto en subscriptions
- Deduplicación de citas antes de insertar

### Formato del reporte:

```
## 🔍 Auditoría NexoBot — [fecha]

### Puntuación: X/100

| Área          | Estado | Puntos |
|---------------|--------|--------|
| Seguridad     | ✅/⚠️/🔴 | X/20  |
| Rendimiento   | ✅/⚠️/🔴 | X/20  |
| Confiabilidad | ✅/⚠️/🔴 | X/20  |
| UX/UI         | ✅/⚠️/🔴 | X/20  |
| Datos         | ✅/⚠️/🔴 | X/20  |

### Issues encontrados:
[lista con severidad y fix propuesto]

### Fixes aplicados automáticamente:
[lista de cambios realizados]
```

Después de generar el reporte, aplica todos los fixes que sean seguros de hacer automáticamente (no requieren decisión del usuario).
