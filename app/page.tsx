"use client";

import { FormEvent, useEffect, useState } from "react";

const CONTACT = {
  phone: "+57 300 000 0000",
  whatsapp: "573000000000",
  email: "contacto@correayasociados.com",
  address: "Dirección por confirmar",
  city: "Ciudad, Colombia",
};

const services = [
  ["§", "Derecho Civil", "Orientación y representación en obligaciones, contratos y controversias entre particulares."],
  ["◇", "Derecho Laboral", "Acompañamiento preventivo y representación en asuntos derivados de relaciones laborales."],
  ["▦", "Derecho Comercial", "Asesoría legal para empresas, comerciantes y el desarrollo seguro de sus negocios."],
  ["⌂", "Derecho de Familia", "Atención sensible y estratégica en asuntos familiares y patrimoniales."],
  ["▤", "Derecho Administrativo", "Orientación frente a actuaciones, trámites y controversias con entidades públicas."],
  ["✦", "Asesoría Jurídica", "Análisis riguroso para comprender sus alternativas y tomar decisiones informadas."],
  ["⚖", "Representación Legal", "Defensa técnica de sus intereses en procesos y actuaciones jurídicas."],
  ["◎", "Conciliaciones", "Búsqueda de acuerdos viables para resolver conflictos de manera eficiente."],
];

const experience = [
  ["Asesoría empresarial", "Asesoría jurídica empresarial", "Acompañamiento preventivo en decisiones corporativas, revisión de documentos y gestión de riesgos legales."],
  ["Derecho Civil", "Representación en procesos civiles", "Estudio de controversias y diseño de estrategias de representación adaptadas a cada situación."],
  ["Derecho Laboral", "Acompañamiento en procesos laborales", "Orientación en relaciones laborales, reclamaciones y actuaciones ante las autoridades competentes."],
  ["Conciliación", "Conciliaciones y resolución de conflictos", "Preparación y acompañamiento en escenarios de negociación para construir soluciones claras y sostenibles."],
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  async function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) return form.reportValidity();
    setStatus("loading");
    await new Promise((resolve) => setTimeout(resolve, 1100));
    setStatus("success");
    form.reset();
  }

  const closeMenu = () => setMenuOpen(false);
  const whatsappMessage = encodeURIComponent("Hola, vi la página web de Correa y Asociados y estoy interesado en recibir asesoría jurídica.");

  return (
    <main>
      <header className={scrolled ? "site-header is-scrolled" : "site-header"}>
        <a className="brand" href="#inicio" aria-label="Correa y Asociados, inicio" onClick={closeMenu}>
          <span className="brand-mark" aria-hidden="true">⚖</span>
          <span><b>CORREA</b><small>Y ASOCIADOS</small></span>
        </a>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-controls="main-nav" aria-label="Abrir menú">
          <span /> <span />
        </button>
        <nav id="main-nav" className={menuOpen ? "nav open" : "nav"} aria-label="Navegación principal">
          {[["Inicio", "inicio"], ["Nosotros", "nosotros"], ["Servicios", "servicios"], ["Experiencia", "experiencia"], ["Contacto", "contacto"]].map(([label, id]) => <a href={`#${id}`} onClick={closeMenu} key={id}>{label}</a>)}
          <a className="nav-cta" href="#contacto" onClick={closeMenu}>Solicitar asesoría <span>↗</span></a>
        </nav>
      </header>

      <section className="hero" id="inicio">
        <div className="hero-shade" />
        <div className="hero-rule" />
        <div className="hero-content reveal">
          <p className="eyebrow">FIRMA DE ABOGADOS <span /></p>
          <h1>Defendemos sus derechos.<br /><em>Protegemos sus intereses.</em></h1>
          <p className="hero-copy">Asesoría y representación jurídica con rigor, experiencia y compromiso. Soluciones legales pensadas alrededor de cada cliente.</p>
          <div className="actions">
            <a className="button gold" href="#contacto">Solicitar asesoría <span>→</span></a>
            <a className="button ghost" href="#servicios">Conocer nuestros servicios</a>
          </div>
        </div>
        <div className="trust-strip">
          {["Atención personalizada", "Confidencialidad", "Compromiso", "Rigor jurídico"].map((item) => <span key={item}><i>◆</i>{item}</span>)}
        </div>
        <a className="scroll-cue" href="#nosotros" aria-label="Desplazarse a Nosotros">DESLIZAR <b>↓</b></a>
      </section>

      <section className="about section" id="nosotros">
        <div className="about-image reveal">
          <div className="image-frame" role="img" aria-label="Interior elegante de una oficina jurídica" />
          <div className="image-note"><span>⚖</span><p>Su caso merece atención<br /><b>rigurosa y personal</b></p></div>
        </div>
        <div className="about-copy reveal">
          <p className="eyebrow dark">QUIÉNES SOMOS <span /></p>
          <h2>Experiencia jurídica<br /><em>a su servicio</em></h2>
          <p className="lead">Correa y Asociados es una firma comprometida con la defensa de los intereses de sus clientes.</p>
          <p>Nuestro trabajo se fundamenta en el análisis jurídico riguroso, la atención personalizada y la búsqueda de soluciones efectivas para cada situación.</p>
          <div className="principles">
            {["Análisis riguroso", "Confianza y reserva", "Ética profesional", "Atención personal"].map((p, i) => <div key={p}><b>0{i + 1}</b><span>{p}</span></div>)}
          </div>
          <a className="text-link" href="#contacto">CONVERSE CON NUESTRO EQUIPO <span>→</span></a>
        </div>
      </section>

      <section className="services section" id="servicios">
        <div className="section-heading reveal">
          <div><p className="eyebrow">ÁREAS DE PRÁCTICA <span /></p><h2>Nuestros <em>servicios</em></h2></div>
          <p>Soluciones jurídicas claras, estratégicas y construidas para responder a las particularidades de cada caso.</p>
        </div>
        <div className="service-grid">
          {services.map(([icon, title, description], i) => <article className="service-card reveal" style={{ "--delay": `${i * 45}ms` } as React.CSSProperties} key={title}>
            <span className="service-number">0{i + 1}</span><i>{icon}</i><h3>{title}</h3><p>{description}</p><a href="#contacto" aria-label={`Más información sobre ${title}`}>Más información <span>↗</span></a>
          </article>)}
        </div>
        <p className="placeholder-note">Áreas de práctica provisionales · Se actualizarán con los servicios confirmados por la firma.</p>
      </section>

      <section className="experience section" id="experiencia">
        <div className="section-heading light reveal">
          <div><p className="eyebrow dark">TRAYECTORIA PROFESIONAL <span /></p><h2>Nuestra <em>experiencia</em></h2></div>
          <p>Cada caso representa un compromiso con nuestros clientes y sus intereses.</p>
        </div>
        <div className="case-list">
          {experience.map(([tag, title, description], i) => <article className="case reveal" key={title}>
            <span className="case-index">0{i + 1}</span><div><small>{tag}</small><h3>{title}</h3><p>{description}</p></div><a href="#contacto" aria-label={`Consultar sobre ${title}`}>↗</a>
          </article>)}
        </div>
        <p className="placeholder-note dark-note">Contenido ilustrativo · Los casos reales se incorporarán únicamente con información autorizada por la firma.</p>
      </section>

      <section className="statement">
        <span className="statement-mark">“</span>
        <div><p className="eyebrow">UNA DECISIÓN INFORMADA <span /></p><h2>Su tranquilidad comienza con<br /><em>una buena asesoría jurídica.</em></h2><p>Analizamos cada situación de manera personalizada para ofrecer alternativas claras y estratégicas.</p></div>
        <a className="button dark-button" href="#contacto">Hablar con un abogado <span>→</span></a>
      </section>

      <section className="contact section" id="contacto">
        <div className="contact-info reveal">
          <p className="eyebrow">CONTACTO <span /></p>
          <h2>Solicite una<br /><em>asesoría</em></h2>
          <p>Cuéntenos brevemente su situación. Nuestro equipo revisará la información y podrá ponerse en contacto con usted.</p>
          <div className="contact-data">
            <a href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}><i>☎</i><span><small>TELÉFONO / WHATSAPP</small>{CONTACT.phone}</span></a>
            <a href={`mailto:${CONTACT.email}`}><i>✉</i><span><small>CORREO ELECTRÓNICO</small>{CONTACT.email}</span></a>
            <div><i>⌖</i><span><small>UBICACIÓN</small>{CONTACT.address}<br />{CONTACT.city}</span></div>
          </div>
          <small className="editable">Datos de contacto provisionales, listos para reemplazar.</small>
        </div>
        <form className="contact-form reveal" onSubmit={submitForm}>
          <div className="form-heading"><span>01</span><p><b>Información de contacto</b><small>Los campos marcados con * son obligatorios.</small></p></div>
          <div className="field-grid">
            <label>Nombre completo *<input name="name" required minLength={3} autoComplete="name" placeholder="Escriba su nombre" /></label>
            <label>Correo electrónico *<input type="email" name="email" required autoComplete="email" placeholder="nombre@correo.com" /></label>
            <label>Teléfono / WhatsApp *<input type="tel" name="phone" required pattern="[0-9+()\s-]{7,20}" autoComplete="tel" placeholder="+57 300 000 0000" /></label>
            <label>Servicio de interés *<select name="service" required defaultValue=""><option value="" disabled>Seleccione una opción</option>{services.map((s) => <option key={s[1]}>{s[1]}</option>)}</select></label>
            <label>Ciudad<input name="city" autoComplete="address-level2" placeholder="Ciudad" /></label>
            <label className="full">Descripción breve del caso *<textarea name="message" required minLength={15} rows={4} placeholder="Cuéntenos brevemente cómo podemos ayudarle..." /></label>
          </div>
          <label className="checkbox"><input type="checkbox" required /><span>He leído y acepto la <a href="#privacidad">política de tratamiento de datos personales</a>.</span></label>
          <button className="button gold submit" disabled={status === "loading"}>{status === "loading" ? "Enviando solicitud…" : "Enviar solicitud"}<span>→</span></button>
          {status === "success" && <p className="success" role="status">✓ Solicitud enviada correctamente. Nos pondremos en contacto con usted.</p>}
          <p className="demo-note">Modo demostración: el envío seguro por correo se activará al configurar el servicio de formularios.</p>
        </form>
      </section>

      <footer>
        <div className="footer-main">
          <div className="footer-brand"><a className="brand" href="#inicio"><span className="brand-mark">⚖</span><span><b>CORREA</b><small>Y ASOCIADOS</small></span></a><p>Soluciones jurídicas con experiencia,<br />compromiso y confianza.</p></div>
          <div><h3>Navegación</h3>{[["Inicio", "inicio"], ["Nosotros", "nosotros"], ["Servicios", "servicios"], ["Experiencia", "experiencia"], ["Contacto", "contacto"]].map(([l, id]) => <a href={`#${id}`} key={id}>{l}</a>)}</div>
          <div><h3>Contacto</h3><p>{CONTACT.phone}</p><p>{CONTACT.email}</p><p>{CONTACT.city}</p></div>
          <div id="privacidad"><h3>Información legal</h3><a href="#privacidad">Política de privacidad</a><a href="#privacidad">Tratamiento de datos</a></div>
        </div>
        <div className="footer-bottom"><p>© {new Date().getFullYear()} Correa y Asociados. Todos los derechos reservados.</p><p>Defensa · Estrategia · Confianza</p></div>
      </footer>

      <a className="whatsapp" href={`https://wa.me/${CONTACT.whatsapp}?text=${whatsappMessage}`} target="_blank" rel="noreferrer" aria-label="Hablar por WhatsApp"><span>◔</span><b>WhatsApp</b></a>
    </main>
  );
}
