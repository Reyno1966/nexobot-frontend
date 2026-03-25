/**
 * Utilidades de exportación para el Business Module.
 * Soporta Excel (.xlsx) y PDF con cabecera NexoBot y colores de marca.
 */

// ── Tipos ────────────────────────────────────────────────────────────────────

export interface ExportColumn {
  header: string;
  key: string;
  width?: number;        // ancho en caracteres para Excel
  align?: "left" | "right" | "center";
}

export interface ExportOptions {
  filename: string;       // sin extensión
  title: string;          // ej. "Reporte de Ventas"
  subtitle?: string;      // ej. "Período: marzo 2026"
  columns: ExportColumn[];
  rows: Record<string, string | number>[];
  totals?: Record<string, string | number>;  // fila de totales
}

// ── Excel (.xlsx) ────────────────────────────────────────────────────────────

export async function exportToXLSX(opts: ExportOptions): Promise<void> {
  const XLSX = (await import("xlsx")).default;

  const headers = opts.columns.map((c) => c.header);
  const data: (string | number)[][] = opts.rows.map((row) =>
    opts.columns.map((c) => row[c.key] ?? "")
  );

  if (opts.totals) {
    const totalsRow = opts.columns.map((c) => opts.totals![c.key] ?? "");
    data.push(totalsRow);
  }

  // Metadata en filas superiores
  const sheetData: (string | number)[][] = [
    [`NexoBot — ${opts.title}`],
    [opts.subtitle ?? `Generado: ${new Date().toLocaleDateString("es", { day: "2-digit", month: "long", year: "numeric" })}`],
    [],
    headers,
    ...data,
  ];

  const ws = XLSX.utils.aoa_to_sheet(sheetData);

  // Ancho de columnas
  ws["!cols"] = opts.columns.map((c) => ({
    wch: c.width ?? Math.max(c.header.length + 4, 14),
  }));

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, opts.title.slice(0, 31));
  XLSX.writeFile(wb, `${opts.filename}.xlsx`);
}

// ── PDF ──────────────────────────────────────────────────────────────────────

export async function exportToPDF(opts: ExportOptions): Promise<void> {
  const { default: jsPDF } = await import("jspdf");
  const { default: autoTable } = await import("jspdf-autotable");

  const doc = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });

  // ── Cabecera ─────────────────────────────────────────────────────────────
  // Fondo teal en la cabecera superior
  doc.setFillColor(44, 197, 197); // #2CC5C5
  doc.rect(0, 0, 297, 22, "F");

  // Título
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text(`NexoBot — ${opts.title}`, 14, 10);

  // Subtítulo / fecha
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  const subtitle =
    opts.subtitle ??
    `Generado: ${new Date().toLocaleDateString("es", { day: "2-digit", month: "long", year: "numeric" })}`;
  doc.text(subtitle, 14, 17);

  // Fecha a la derecha
  const now = new Date().toLocaleString("es", {
    day: "2-digit", month: "2-digit", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
  const dateWidth = doc.getTextWidth(now);
  doc.text(now, 297 - 14 - dateWidth, 17);

  // ── Tabla ─────────────────────────────────────────────────────────────────
  const head = [opts.columns.map((c) => c.header)];
  const body = opts.rows.map((row) =>
    opts.columns.map((c) => String(row[c.key] ?? ""))
  );

  if (opts.totals) {
    body.push(opts.columns.map((c) => String(opts.totals![c.key] ?? "")));
  }

  const colStyles: Record<number, { halign: "left" | "right" | "center" }> = {};
  opts.columns.forEach((c, i) => {
    if (c.align) colStyles[i] = { halign: c.align };
  });

  // Índice de la fila de totales (si existe)
  const totalRowIdx = opts.totals ? body.length - 1 : -1;

  autoTable(doc, {
    startY: 26,
    head,
    body,
    styles: {
      fontSize: 9,
      cellPadding: 3,
      lineColor: [229, 231, 235],
      lineWidth: 0.1,
    },
    headStyles: {
      fillColor: [44, 197, 197],  // #2CC5C5
      textColor: [255, 255, 255],
      fontStyle: "bold",
      halign: "center",
    },
    alternateRowStyles: {
      fillColor: [249, 250, 251],
    },
    columnStyles: colStyles,
    didParseCell(data) {
      // Resaltar fila de totales
      if (data.section === "body" && data.row.index === totalRowIdx) {
        data.cell.styles.fillColor = [238, 249, 249]; // #EEF9F9
        data.cell.styles.fontStyle = "bold";
        data.cell.styles.textColor = [44, 197, 197];
      }
    },
    margin: { left: 14, right: 14 },
  });

  // ── Footer ────────────────────────────────────────────────────────────────
  const pageCount = (doc as unknown as { internal: { getNumberOfPages: () => number } }).internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(7);
    doc.setTextColor(156, 163, 175); // gray-400
    doc.text(
      `nexobot.net — Página ${i} de ${pageCount}`,
      297 / 2,
      doc.internal.pageSize.getHeight() - 5,
      { align: "center" }
    );
  }

  doc.save(`${opts.filename}.pdf`);
}
