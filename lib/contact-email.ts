import type { ContactSubmission } from "@/types/contact";

type ValidationResult =
  | { success: true; data: ContactSubmission; isSpam: boolean }
  | { success: false; error: string };

function clean(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

export function validateContactSubmission(payload: unknown): ValidationResult {
  if (!payload || typeof payload !== "object") {
    return { success: false, error: "La solicitud no tiene un formato válido." };
  }

  const input = payload as Record<string, unknown>;
  const data: ContactSubmission = {
    name: clean(input.name, 120),
    email: clean(input.email, 180).toLowerCase(),
    phone: clean(input.phone, 30),
    service: clean(input.service, 120),
    city: clean(input.city, 120),
    message: clean(input.message, 4_000),
    website: clean(input.website, 200),
    consent: input.consent === true,
  };

  const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email);
  const phoneIsValid = /^[0-9+()\s-]{7,20}$/.test(data.phone);
  const requiredFieldsAreValid =
    data.name.length >= 3 &&
    emailIsValid &&
    phoneIsValid &&
    Boolean(data.service) &&
    data.message.length >= 15 &&
    data.consent;

  if (!requiredFieldsAreValid) {
    return {
      success: false,
      error: "Revise los campos obligatorios e intente nuevamente.",
    };
  }

  return { success: true, data, isSpam: Boolean(data.website) };
}

function escapeHtml(value: string) {
  const entities: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#39;",
    '"': "&quot;",
  };
  return value.replace(/[&<>'"]/g, (character) => entities[character]);
}

export function createContactEmail(submission: ContactSubmission) {
  const safe = {
    name: escapeHtml(submission.name),
    email: escapeHtml(submission.email),
    phone: escapeHtml(submission.phone),
    service: escapeHtml(submission.service),
    city: escapeHtml(submission.city || "No indicada"),
    message: escapeHtml(submission.message).replace(/\n/g, "<br />"),
  };

  return {
    subject: `Nueva solicitud web · ${submission.service}`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:680px;margin:auto;color:#171612">
        <div style="background:#0a0a09;color:#d4af37;padding:28px">
          <h1 style="font-size:24px;margin:0">CORREA &amp; ASOCIADOS</h1>
          <p style="color:#ddd5c4;margin:8px 0 0">Nueva solicitud de asesoría desde la página web</p>
        </div>
        <div style="padding:28px;border:1px solid #ded8cb;border-top:0">
          <p><strong>Nombre:</strong> ${safe.name}</p>
          <p><strong>Correo:</strong> <a href="mailto:${safe.email}">${safe.email}</a></p>
          <p><strong>Teléfono / WhatsApp:</strong> ${safe.phone}</p>
          <p><strong>Servicio:</strong> ${safe.service}</p>
          <p><strong>Ciudad:</strong> ${safe.city}</p>
          <hr style="border:0;border-top:1px solid #ded8cb;margin:24px 0" />
          <p><strong>Descripción del caso:</strong></p>
          <p style="line-height:1.7">${safe.message}</p>
        </div>
      </div>`,
    text: [
      "NUEVA SOLICITUD WEB — CORREA & ASOCIADOS",
      `Nombre: ${submission.name}`,
      `Correo: ${submission.email}`,
      `Teléfono / WhatsApp: ${submission.phone}`,
      `Servicio: ${submission.service}`,
      `Ciudad: ${submission.city || "No indicada"}`,
      "",
      "Descripción del caso:",
      submission.message,
    ].join("\n"),
  };
}
