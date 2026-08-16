# Correa & Asociados

Landing page de la firma Correa & Asociados, construida con React, TypeScript y
Vinext. Incluye diseño responsive, contacto por WhatsApp y envío seguro de
solicitudes mediante Resend.

## Ejecutar el proyecto

```bash
npm install
npm run dev
```

La aplicación estará disponible normalmente en `http://localhost:3000`.

## Configurar el correo

1. Copie `.env.example` como `.env.local`.
2. Agregue la clave privada de Resend.
3. Reinicie `npm run dev` después de modificar variables de entorno.

```env
RESEND_API_KEY=re_xxxxxxxxx
CONTACT_EMAIL=correo-destinatario@ejemplo.com
RESEND_FROM_EMAIL="Correa & Asociados <onboarding@resend.dev>"
```

`.env.local` está excluido de Git para evitar publicar credenciales.

## Arquitectura

```text
app/
  api/contact/route.ts     Endpoint del formulario
  globals.css              Sistema visual y estilos responsive
  layout.tsx               Metadatos y estructura HTML
  page.tsx                 Composición de la landing

components/
  sections/                Secciones independientes de la página
  ui/                      Componentes visuales reutilizables
  Header.tsx               Navegación y menú móvil
  Footer.tsx               Pie de página
  FloatingWhatsApp.tsx     Acceso directo a WhatsApp

config/site.ts             Datos de contacto y contenido editable
lib/contact-email.ts       Validación y plantilla del correo
lib/resend.ts              Comunicación exclusiva con Resend
types/contact.ts           Tipos del formulario y la API
worker/index.ts            Entrada compatible con Cloudflare
```

## Dónde realizar cambios

- Datos, teléfono, WhatsApp y servicios: `config/site.ts`.
- Textos de una sección: `components/sections/`.
- Colores y diseño: `app/globals.css`.
- Validación o plantilla del correo: `lib/contact-email.ts`.
- Proveedor de correo: `lib/resend.ts`.

## Comandos disponibles

```bash
npm run dev      # Entorno local
npm run build    # Compilación de producción
npm run lint     # Revisión de calidad
npm test         # Validación completa mediante build
```
