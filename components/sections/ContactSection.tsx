"use client";

import { FormEvent, useState } from "react";
import { CONTACT, SERVICES } from "@/config/site";
import type { ContactApiResponse, ContactSubmission } from "@/types/contact";

type FormStatus = "idle" | "loading" | "success" | "error";

function readSubmission(form: HTMLFormElement): ContactSubmission {
  const data = new FormData(form);
  return {
    name: String(data.get("name") ?? ""),
    email: String(data.get("email") ?? ""),
    phone: String(data.get("phone") ?? ""),
    service: String(data.get("service") ?? ""),
    city: String(data.get("city") ?? ""),
    message: String(data.get("message") ?? ""),
    website: String(data.get("website") ?? ""),
    consent: data.get("consent") === "accepted",
  };
}

export function ContactSection() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [formMessage, setFormMessage] = useState("");

  async function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) return form.reportValidity();

    setStatus("loading");
    setFormMessage("");

    try {
      const response = await fetch("/.netlify/functions/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(readSubmission(form)),
      });
      const result = (await response
        .json()
        .catch(() => ({}))) as ContactApiResponse;

      if (!response.ok) {
        throw new Error(
          result.error ?? "No fue posible enviar la solicitud. Intente nuevamente.",
        );
      }

      form.reset();
      setStatus("success");
      setFormMessage(
        "Solicitud enviada correctamente. Nos pondremos en contacto con usted.",
      );
    } catch (error) {
      setStatus("error");
      setFormMessage(
        error instanceof Error && error.message
          ? error.message
          : "No fue posible enviar la solicitud. Intente nuevamente.",
      );
    }
  }

  return (
    <section className="contact section" id="contacto">
      <ContactDetails />
      <ContactForm
        status={status}
        message={formMessage}
        onSubmit={submitForm}
      />
    </section>
  );
}

function ContactDetails() {
  return (
    <div className="contact-info reveal">
      <p className="eyebrow">
        CONTACTO <span />
      </p>
      <h2>
        Solicite una
        <br />
        <em>asesoría</em>
      </h2>
      <p>
        Cuéntenos brevemente su situación. Nuestro equipo revisará la información
        y podrá ponerse en contacto con usted.
      </p>

      <div className="contact-data">
        <a href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}>
          <i>☎</i>
          <span>
            <small>{CONTACT.name.toUpperCase()} · TELÉFONO / WHATSAPP</small>
            {CONTACT.phone}
          </span>
        </a>
        <a href={`mailto:${CONTACT.email}`}>
          <i>✉</i>
          <span>
            <small>CORREO ELECTRÓNICO</small>
            {CONTACT.email}
          </span>
        </a>
        <div>
          <i>⌖</i>
          <span>
            <small>UBICACIÓN</small>
            {CONTACT.address}
            <br />
            {CONTACT.city}
          </span>
        </div>
      </div>
      <small className="editable">Atención en Bucaramanga con cita previa.</small>
    </div>
  );
}

type ContactFormProps = {
  status: FormStatus;
  message: string;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

function ContactForm({ status, message, onSubmit }: ContactFormProps) {
  return (
    <form className="contact-form reveal" onSubmit={onSubmit}>
      <div className="form-heading">
        <span>01</span>
        <p>
          <b>Información de contacto</b>
          <small>Los campos marcados con * son obligatorios.</small>
        </p>
      </div>

      <div className="field-grid">
        <label className="honey" aria-hidden="true">
          Sitio web
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
        <label>
          Nombre completo *
          <input name="name" required minLength={3} autoComplete="name" placeholder="Escriba su nombre" />
        </label>
        <label>
          Correo electrónico *
          <input type="email" name="email" required autoComplete="email" placeholder="nombre@correo.com" />
        </label>
        <label>
          Teléfono / WhatsApp *
          <input type="tel" name="phone" required pattern="[0-9+()\s-]{7,20}" autoComplete="tel" placeholder="+57 300 000 0000" />
        </label>
        <label>
          Servicio de interés *
          <select name="service" required defaultValue="">
            <option value="" disabled>Seleccione una opción</option>
            {SERVICES.map(({ title }) => <option key={title}>{title}</option>)}
          </select>
        </label>
        <label>
          Ciudad
          <input name="city" autoComplete="address-level2" placeholder="Ciudad" />
        </label>
        <label className="full">
          Descripción breve del caso *
          <textarea name="message" required minLength={15} rows={4} placeholder="Cuéntenos brevemente cómo podemos ayudarle..." />
        </label>
      </div>

      <label className="checkbox">
        <input type="checkbox" name="consent" value="accepted" required />
        <span>
          He leído y acepto la <a href="#privacidad">política de tratamiento de datos personales</a>.
        </span>
      </label>

      <button className="button gold submit" disabled={status === "loading"}>
        {status === "loading" ? "Enviando solicitud…" : "Enviar solicitud"}
        <span>→</span>
      </button>

      {status === "success" && <p className="success" role="status">✓ {message}</p>}
      {status === "error" && <p className="form-error" role="alert">{message}</p>}
      <p className="demo-note">La información se envía de forma segura a Correa &amp; Asociados.</p>
    </form>
  );
}
