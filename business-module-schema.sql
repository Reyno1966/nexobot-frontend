-- ─────────────────────────────────────────────────────────────────────────────
-- NexoBot Business Module — Schema SQL
-- Fecha: 2026-03-12
-- Ejecutar en Supabase SQL Editor
-- ─────────────────────────────────────────────────────────────────────────────


-- ── 1. business_expenses — Gastos y compras del negocio ──────────────────────
CREATE TABLE IF NOT EXISTS business_expenses (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  description TEXT        NOT NULL,
  amount      NUMERIC(10,2) NOT NULL CHECK (amount >= 0),
  category    TEXT        NOT NULL DEFAULT 'Otros',
  supplier    TEXT,
  date        DATE        NOT NULL DEFAULT CURRENT_DATE,
  receipt_url TEXT,
  notes       TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE business_expenses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own expenses"
  ON business_expenses FOR ALL
  USING  (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_business_expenses_user_id ON business_expenses(user_id);
CREATE INDEX IF NOT EXISTS idx_business_expenses_date    ON business_expenses(date DESC);


-- ── 2. business_sales — Ventas del día / caja diaria ─────────────────────────
CREATE TABLE IF NOT EXISTS business_sales (
  id             UUID          PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id        UUID          NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  date           DATE          NOT NULL DEFAULT CURRENT_DATE,
  description    TEXT          NOT NULL,
  amount         NUMERIC(10,2) NOT NULL CHECK (amount >= 0),
  payment_method TEXT          NOT NULL DEFAULT 'efectivo',  -- efectivo | tarjeta | transferencia | otro
  category       TEXT,
  notes          TEXT,
  created_at     TIMESTAMPTZ   NOT NULL DEFAULT now(),
  updated_at     TIMESTAMPTZ   NOT NULL DEFAULT now()
);

ALTER TABLE business_sales ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own sales"
  ON business_sales FOR ALL
  USING  (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_business_sales_user_id ON business_sales(user_id);
CREATE INDEX IF NOT EXISTS idx_business_sales_date    ON business_sales(date DESC);


-- ── 3. business_notes — Notas rápidas y recordatorios ────────────────────────
CREATE TABLE IF NOT EXISTS business_notes (
  id         UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    UUID        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  content    TEXT        NOT NULL,
  color      TEXT        NOT NULL DEFAULT 'yellow',  -- yellow | blue | green | red | purple
  is_pinned  BOOLEAN     NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE business_notes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own notes"
  ON business_notes FOR ALL
  USING  (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_business_notes_user_id ON business_notes(user_id);


-- ── 4. Función y triggers para updated_at automático ─────────────────────────
-- (Si update_updated_at ya existe en la BD, omitir la función y solo los triggers)
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS expenses_updated_at ON business_expenses;
CREATE TRIGGER expenses_updated_at
  BEFORE UPDATE ON business_expenses
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS sales_updated_at ON business_sales;
CREATE TRIGGER sales_updated_at
  BEFORE UPDATE ON business_sales
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS notes_updated_at ON business_notes;
CREATE TRIGGER notes_updated_at
  BEFORE UPDATE ON business_notes
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();


-- ─────────────────────────────────────────────────────────────────────────────
-- NOTA: cost_price en products se añadirá en una sesión futura,
-- cuando la tabla products esté creada.
-- ─────────────────────────────────────────────────────────────────────────────
