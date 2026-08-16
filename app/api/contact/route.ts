import {
  createContactEmail,
  validateContactSubmission,
} from "@/lib/contact-email";
import { sendEmailWithResend } from "@/lib/resend";

const MAX_REQUEST_SIZE = 12_000;
const DEFAULT_CONTACT_EMAIL = "johanandres888@hotmail.com";
const DEFAULT_FROM_EMAIL = "Correa & Asociados <onboarding@resend.dev>";

export async function POST(request: Request) {
  try {
    if (requestIsTooLarge(request)) {
      return errorResponse("La solicitud es demasiado extensa.", 413);
    }

    const validation = validateContactSubmission(await request.json());
    if (!validation.success) {
      return errorResponse(validation.error, 400);
    }

    // Respondemos como si fuera válido para no enseñar el honeypot a los bots.
    if (validation.isSpam) return Response.json({ ok: true });

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return errorResponse("El servicio de correo aún no está configurado.", 503);
    }

    const email = createContactEmail(validation.data);
    const delivery = await sendEmailWithResend({
      apiKey,
      from: process.env.RESEND_FROM_EMAIL ?? DEFAULT_FROM_EMAIL,
      to: process.env.CONTACT_EMAIL ?? DEFAULT_CONTACT_EMAIL,
      replyTo: validation.data.email,
      ...email,
    });

    if (!delivery.ok) {
      const message =
        delivery.status === 403
          ? "Resend no autoriza el destinatario configurado. Verifique el dominio o use el correo asociado a su cuenta."
          : "No fue posible enviar la solicitud. Intente nuevamente o contáctenos por WhatsApp.";
      return errorResponse(message, 502);
    }

    return Response.json({ ok: true });
  } catch {
    return errorResponse(
      "Ocurrió un problema al enviar la solicitud. Intente nuevamente.",
      500,
    );
  }
}

function requestIsTooLarge(request: Request) {
  const contentLength = Number(request.headers.get("content-length") ?? 0);
  return contentLength > MAX_REQUEST_SIZE;
}

function errorResponse(error: string, status: number) {
  return Response.json({ error }, { status });
}
