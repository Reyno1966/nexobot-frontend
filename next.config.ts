import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ESLint habilitado en builds para detectar errores a tiempo
  eslint: {
    ignoreDuringBuilds: false,
  },
  // Headers de seguridad para producción
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
};

export default nextConfig;
