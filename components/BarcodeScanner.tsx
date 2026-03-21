"use client";

/**
 * components/BarcodeScanner.tsx
 * Lector de códigos de barras y QR usando @zxing/library.
 * Funciona en web y móvil (usa la cámara trasera por defecto).
 * Se importa normalmente desde páginas "use client" — @zxing se carga
 * dinámicamente en useEffect para evitar errores de SSR.
 */

import { useEffect, useRef, useState } from "react";

export interface BarcodeScannerProps {
  onScan:  (code: string) => void;
  onClose: () => void;
}

export default function BarcodeScanner({ onScan, onClose }: BarcodeScannerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const readerRef = useRef<{ reset: () => void } | null>(null);
  const [status, setStatus] = useState<"loading" | "scanning" | "error">("loading");
  const [errorMsg, setErrorMsg] = useState("");
  const scannedRef = useRef(false); // evita múltiples callbacks

  useEffect(() => {
    let cancelled = false;

    async function startScanner() {
      try {
        const { BrowserMultiFormatReader, NotFoundException } =
          await import("@zxing/library");

        if (cancelled) return;

        const reader = new BrowserMultiFormatReader();
        readerRef.current = reader;
        setStatus("scanning");

        await reader.decodeFromConstraints(
          {
            video: {
              facingMode: "environment",
              width:       { ideal: 1280 },
              height:      { ideal: 720 },
            },
          },
          videoRef.current!,
          (result, err) => {
            if (result && !scannedRef.current && !cancelled) {
              scannedRef.current = true;
              reader.reset();
              onScan(result.getText());
            }
            // NotFoundException es normal cuando no hay código en cuadro — ignorar
            if (err && !(err instanceof NotFoundException)) {
              if (!cancelled) {
                setStatus("error");
                setErrorMsg("Error leyendo el código. Intenta de nuevo.");
              }
            }
          }
        );
      } catch (e) {
        if (!cancelled) {
          const msg =
            e instanceof Error && e.name === "NotAllowedError"
              ? "Permiso de cámara denegado. Habilita la cámara en tu navegador."
              : "No se pudo iniciar la cámara. Verifica los permisos.";
          setStatus("error");
          setErrorMsg(msg);
        }
      }
    }

    startScanner();

    return () => {
      cancelled = true;
      readerRef.current?.reset();
    };
  }, [onScan]);

  // Cerrar con Escape
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[60] bg-black/80 flex items-center justify-center p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-white rounded-2xl overflow-hidden w-full max-w-sm shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M12 4v1m0 14v1M4.22 4.22l.7.7m12.16 12.16l.7.7M1 12h1m20 0h1M4.22 19.78l.7-.7M18.36 5.64l.7-.7" />
            </svg>
            <h3 className="font-semibold text-gray-900 text-sm">Escanear código de barras</h3>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition text-lg leading-none"
          >
            ×
          </button>
        </div>

        {/* Visor de cámara */}
        <div className="relative bg-black" style={{ aspectRatio: "4/3" }}>
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            playsInline
            muted
          />

          {/* Overlay de guía */}
          {status === "scanning" && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              {/* Marco de escaneo */}
              <div className="relative w-56 h-36">
                {/* Esquinas */}
                <span className="absolute top-0 left-0 w-6 h-6 border-t-3 border-l-3 border-white rounded-tl-sm" style={{ borderWidth: "3px 0 0 3px" }} />
                <span className="absolute top-0 right-0 w-6 h-6 border-t-3 border-r-3 border-white rounded-tr-sm" style={{ borderWidth: "3px 3px 0 0" }} />
                <span className="absolute bottom-0 left-0 w-6 h-6 border-b-3 border-l-3 border-white rounded-bl-sm" style={{ borderWidth: "0 0 3px 3px" }} />
                <span className="absolute bottom-0 right-0 w-6 h-6 border-b-3 border-r-3 border-white rounded-br-sm" style={{ borderWidth: "0 3px 3px 0" }} />
                {/* Línea de escaneo animada */}
                <div className="absolute inset-x-2 h-0.5 bg-green-400/80 rounded-full animate-scan-line" />
              </div>
            </div>
          )}

          {/* Loading overlay */}
          {status === "loading" && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60">
              <div className="w-8 h-8 border-3 border-white border-t-transparent rounded-full animate-spin mb-2" style={{ borderWidth: "3px" }} />
              <p className="text-white text-xs">Iniciando cámara…</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-3 bg-gray-50">
          {status === "scanning" && (
            <p className="text-center text-xs text-gray-500">
              Apunta la cámara al código de barras o QR
            </p>
          )}
          {status === "error" && (
            <div className="bg-red-50 border border-red-100 rounded-xl px-3 py-2">
              <p className="text-red-600 text-xs text-center">{errorMsg}</p>
            </div>
          )}
          <button
            onClick={onClose}
            className="mt-2 w-full py-2 border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-100 transition"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
