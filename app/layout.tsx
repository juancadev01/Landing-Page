import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Correa y Asociados | Firma de Abogados",
  description: "Asesoría y representación jurídica con rigor, atención personalizada y compromiso. Solicite una asesoría con Correa y Asociados.",
  openGraph: {
    title: "Correa y Asociados | Firma de Abogados",
    description: "Defendemos sus derechos. Protegemos sus intereses.",
    type: "website",
    locale: "es_CO",
  },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es"><body>{children}</body></html>;
}
