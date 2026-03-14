-- ─────────────────────────────────────────────────────────────────────────────
-- NexoBot WhatsApp Integration — Schema SQL
-- Fecha: 2026-03-14
-- Ejecutar en Supabase SQL Editor (solo cuando el código esté desplegado)
-- ─────────────────────────────────────────────────────────────────────────────


-- ── 1. whatsapp_connections ───────────────────────────────────────────────────
-- Vincula un bot de NexoBot con un número de WhatsApp Business.
-- Cada fila = un número de WhatsApp activo respondiendo con ese bot.
-- Arquitectura multi-tenant: cada cliente puede conectar su propio número.
-- Si wa_token es NULL → usa env WHATSAPP_TOKEN (modo plataforma única).

CREATE TABLE IF NOT EXISTS whatsapp_connections (
  id               UUID          PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id          UUID          NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  bot_id           UUID          NOT NULL REFERENCES bots(id) ON DELETE CASCADE,
  phone_number_id  TEXT          NOT NULL,           -- Meta Phone Number ID (ej: 875188135685843)
  display_phone    TEXT,                             -- Nro visible al usuario (ej: +1 555 555 5555)
  wa_token         TEXT,                             -- Token de acceso permanente; NULL = usar env
  active           BOOLEAN       NOT NULL DEFAULT true,
  created_at       TIMESTAMPTZ   NOT NULL DEFAULT now(),
  updated_at       TIMESTAMPTZ   NOT NULL DEFAULT now(),

  -- Solo puede haber UNA conexión activa por phone_number_id
  CONSTRAINT uq_phone_number_id UNIQUE (phone_number_id)
);

-- ── RLS ──────────────────────────────────────────────────────────────────────
ALTER TABLE whatsapp_connections ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own whatsapp connections"
  ON whatsapp_connections FOR ALL
  USING  (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- ── Índices ──────────────────────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_wa_connections_user_id       ON whatsapp_connections(user_id);
CREATE INDEX IF NOT EXISTS idx_wa_connections_bot_id        ON whatsapp_connections(bot_id);
CREATE INDEX IF NOT EXISTS idx_wa_connections_phone_number  ON whatsapp_connections(phone_number_id);

-- ── Trigger updated_at ───────────────────────────────────────────────────────
-- Si update_updated_at_column ya existe (del Business Module), omite la función.
-- Si NO la ejecutaste antes, descomenta el bloque:

-- CREATE OR REPLACE FUNCTION update_updated_at_column()
-- RETURNS TRIGGER AS $$
-- BEGIN
--   NEW.updated_at = now();
--   RETURN NEW;
-- END;
-- $$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS wa_connections_updated_at ON whatsapp_connections;
CREATE TRIGGER wa_connections_updated_at
  BEFORE UPDATE ON whatsapp_connections
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();


-- ── 2. Insertar la conexión inicial (NexoBot plataforma) ──────────────────────
-- Reemplaza <TU_USER_ID> y <TU_BOT_ID> con los valores reales de Supabase.
-- Puedes obtenerlos desde el dashboard de Supabase → tabla auth.users y bots.
--
-- INSERT INTO whatsapp_connections (user_id, bot_id, phone_number_id, display_phone, active)
-- VALUES (
--   '<TU_USER_ID>',
--   '<TU_BOT_ID>',
--   '875188135685843',
--   '+1 XXX XXX XXXX',
--   true
-- );


-- ─────────────────────────────────────────────────────────────────────────────
-- NOTAS
-- ─────────────────────────────────────────────────────────────────────────────
-- • UNIQUE en phone_number_id garantiza que no haya dos bots respondiendo
--   al mismo número simultáneamente.
-- • wa_token = NULL → el webhook usa la env WHATSAPP_TOKEN de Vercel.
-- • El INSERT inicial también se puede hacer desde el dashboard (pestaña
--   WhatsApp del bot) una vez desplegado.
-- ─────────────────────────────────────────────────────────────────────────────
