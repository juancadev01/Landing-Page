import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Correa & Asociados | Asesoría Jurídica y Representación Legal",
  description: "Asesoría jurídica y representación legal en Bucaramanga. Atención personalizada con rigor, compromiso y confianza.",
  openGraph: {
    title: "Correa & Asociados | Firma de Abogados",
    description: "Defendemos sus derechos. Protegemos sus intereses.",
    type: "website",
    locale: "es_CO",
    images: [{ url: "/correa-brand.jpeg", width: 1415, height: 872, alt: "Correa & Asociados — Asesoría jurídica y representación legal" }],
  },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es"><body>{children}</body></html>;
}
