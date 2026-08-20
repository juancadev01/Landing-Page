"use client";

import { FormEvent } from "react";
import { CONTACT, SERVICES } from "@/config/site";
import type { ContactSubmission } from "@/types/contact";

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
  function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) return form.reportValidity();

    const submission = readSubmission(form);
    if (submission.website) return;

    const lines = [
      "Hola, quiero solicitar una asesoría jurídica.",
      "",
      `Nombre: ${submission.name}`,
      `Teléfono: ${submission.phone}`,
      submission.email ? `Correo: ${submission.email}` : "",
      submission.city ? `Ciudad: ${submission.city}` : "",
      `Servicio de interés: ${submission.service}`,
      "",
      "Descripción del caso:",
      submission.message,
    ].filter(Boolean);

    const url = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(lines.join("\n"))}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <section className="contact section" id="contacto">
      <ContactDetails />
      <ContactForm onSubmit={submitForm} />
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
        Cuéntenos brevemente su situación. Al continuar será dirigido a WhatsApp
        para conversar directamente con nuestro equipo.
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
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

function ContactForm({ onSubmit }: ContactFormProps) {
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
          Correo electrónico (opcional)
          <input type="email" name="email" autoComplete="email" placeholder="nombre@correo.com" />
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

      <button className="button gold submit">
        Solicitar asesoría por WhatsApp
        <span>→</span>
      </button>

      <p className="demo-note">
        Al continuar, se abrirá WhatsApp con la información de su solicitud.
      </p>
    </form>
  );
}
