# Correa & Asociados

Landing page de la firma Correa & Asociados, construida con React, TypeScript y
Vite. Incluye diseño responsive, contacto por WhatsApp y envío seguro de
solicitudes mediante una Netlify Function y Resend.

## Ejecutar el proyecto

```bash
npm install
npm run dev
```

La aplicación estará disponible normalmente en `http://localhost:5173`.

## Configurar el correo localmente

1. Copie `.env.example` como `.env.local`.
2. Agregue la clave privada de Resend.
3. Reinicie `npm run dev` después de modificar las variables.

```env
RESEND_API_KEY=re_xxxxxxxxx
CONTACT_EMAIL=correo-destinatario@ejemplo.com
RESEND_FROM_EMAIL="Nombre de la firma <correo-remitente@ejemplo.com>"
```

`.env.local` está excluido de Git para evitar publicar credenciales.

Mientras se use `onboarding@resend.dev`, Resend solo permite enviar al correo
asociado con la cuenta. Para enviar directamente a cualquier correo de la firma,
se debe verificar un dominio en Resend y cambiar `RESEND_FROM_EMAIL` por una
dirección de ese dominio.

## Desplegar en Netlify desde GitHub

1. En Netlify seleccione **Add new project** y **Import an existing project**.
2. Conecte GitHub y elija el repositorio `juanrugeles-dev/LandingPage`.
3. Netlify leerá automáticamente `netlify.toml`: comando `npm run build`, carpeta
   publicada `dist` y funciones en `netlify/functions`.
4. En **Project configuration > Environment variables**, agregue
   `RESEND_API_KEY`, `CONTACT_EMAIL` y `RESEND_FROM_EMAIL`.
5. Inicie el despliegue.

No es recomendable subir únicamente `dist` mediante arrastrar y soltar: la
página se verá, pero el formulario no tendrá la función que envía el correo. La
integración con el repositorio despliega ambas partes.

## Arquitectura

```text
index.html                       Documento HTML de entrada
main.tsx                         Montaje de la aplicación React

app/
  globals.css                    Sistema visual y estilos responsive
  page.tsx                       Composición de la landing

components/
  sections/                      Secciones independientes de la página
  ui/                            Componentes visuales reutilizables
  Header.tsx                     Navegación y menú móvil
  Footer.tsx                     Pie de página
  FloatingWhatsApp.tsx           Acceso directo a WhatsApp

config/site.ts                   Datos de contacto y contenido editable
lib/contact-email.ts             Validación y plantilla del correo
lib/resend.ts                    Comunicación exclusiva con Resend
netlify/functions/contact.ts     Función segura del formulario
netlify.toml                     Configuración de compilación y despliegue
types/contact.ts                 Tipos del formulario y la API
```

## Dónde realizar cambios

- Datos, teléfono, WhatsApp y servicios: `config/site.ts`.
- Textos de una sección: `components/sections/`.
- Colores y diseño: `app/globals.css`.
- Validación o plantilla del correo: `lib/contact-email.ts`.
- Proveedor de correo: `lib/resend.ts`.

## Comandos disponibles

```bash
npm run dev      # Entorno local con emulación de Netlify
npm run build    # Compilación de producción
npm run preview  # Vista previa de la compilación
npm run lint     # Revisión de calidad
npm test         # Validación completa mediante build
```
