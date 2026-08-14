const CONTACT_EMAIL = process.env.CONTACT_EMAIL ?? "johanandres888@hotmail.com";
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL ?? "Correa & Asociados <onboarding@resend.dev>";

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  service?: unknown;
  city?: unknown;
  message?: unknown;
  consent?: unknown;
  website?: unknown;
};

function clean(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#39;",
    '"': "&quot;",
  })[character] ?? character);
}

export async function POST(request: Request) {
  try {
    const contentLength = Number(request.headers.get("content-length") ?? 0);
    if (contentLength > 12_000) {
      return Response.json({ error: "La solicitud es demasiado extensa." }, { status: 413 });
    }

    const payload = (await request.json()) as ContactPayload;
    const name = clean(payload.name, 120);
    const email = clean(payload.email, 180).toLowerCase();
    const phone = clean(payload.phone, 30);
    const service = clean(payload.service, 120);
    const city = clean(payload.city, 120);
    const message = clean(payload.message, 4_000);
    const website = clean(payload.website, 200);

    // Honeypot: los bots suelen completar este campo oculto.
    if (website) return Response.json({ ok: true });

    const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const phoneIsValid = /^[0-9+()\s-]{7,20}$/.test(phone);
    if (name.length < 3 || !emailIsValid || !phoneIsValid || !service || message.length < 15 || payload.consent !== true) {
      return Response.json({ error: "Revise los campos obligatorios e intente nuevamente." }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return Response.json({ error: "El servicio de correo aún no está configurado." }, { status: 503 });
    }

    const safe = {
      name: escapeHtml(name),
      email: escapeHtml(email),
      phone: escapeHtml(phone),
      service: escapeHtml(service),
      city: escapeHtml(city || "No indicada"),
      message: escapeHtml(message).replace(/\n/g, "<br />"),
    };

    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "Idempotency-Key": crypto.randomUUID(),
        "User-Agent": "Correa-Asociados-Website/1.0",
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [CONTACT_EMAIL],
        reply_to: email,
        subject: `Nueva solicitud web · ${service}`,
        html: `<div style="font-family:Arial,sans-serif;max-width:680px;margin:auto;color:#171612"><div style="background:#0a0a09;color:#d4af37;padding:28px"><h1 style="font-size:24px;margin:0">CORREA &amp; ASOCIADOS</h1><p style="color:#ddd5c4;margin:8px 0 0">Nueva solicitud de asesoría desde la página web</p></div><div style="padding:28px;border:1px solid #ded8cb;border-top:0"><p><strong>Nombre:</strong> ${safe.name}</p><p><strong>Correo:</strong> <a href="mailto:${safe.email}">${safe.email}</a></p><p><strong>Teléfono / WhatsApp:</strong> ${safe.phone}</p><p><strong>Servicio:</strong> ${safe.service}</p><p><strong>Ciudad:</strong> ${safe.city}</p><hr style="border:0;border-top:1px solid #ded8cb;margin:24px 0" /><p><strong>Descripción del caso:</strong></p><p style="line-height:1.7">${safe.message}</p></div></div>`,
        text: [
          "NUEVA SOLICITUD WEB — CORREA & ASOCIADOS",
          `Nombre: ${name}`,
          `Correo: ${email}`,
          `Teléfono / WhatsApp: ${phone}`,
          `Servicio: ${service}`,
          `Ciudad: ${city || "No indicada"}`,
          "",
          "Descripción del caso:",
          message,
        ].join("\n"),
      }),
    });

    if (!resendResponse.ok) {
      return Response.json({ error: "No fue posible enviar la solicitud. Intente nuevamente o contáctenos por WhatsApp." }, { status: 502 });
    }

    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: "Ocurrió un problema al enviar la solicitud. Intente nuevamente." }, { status: 500 });
  }
}
