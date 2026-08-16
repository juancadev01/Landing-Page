import { TRUST_ITEMS } from "@/config/site";

export function HeroSection() {
  return (
    <section className="hero" id="inicio">
      <div className="hero-shade" />
      <div className="hero-rule" />

      <div className="hero-content reveal">
        <p className="eyebrow">
          ASESORÍA JURÍDICA Y REPRESENTACIÓN LEGAL <span />
        </p>
        <h1>
          Defendemos sus derechos.
          <br />
          <em>Protegemos sus intereses.</em>
        </h1>
        <p className="hero-copy">
          Asesoría y representación jurídica con rigor, experiencia y
          compromiso. Soluciones legales pensadas alrededor de cada cliente.
        </p>
        <div className="actions">
          <a className="button gold" href="#contacto">
            Solicitar asesoría <span>→</span>
          </a>
          <a className="button ghost" href="#servicios">
            Conocer nuestros servicios
          </a>
        </div>
      </div>

      <div className="trust-strip">
        {TRUST_ITEMS.map((item) => (
          <span key={item}>
            <i>◆</i>
            {item}
          </span>
        ))}
      </div>

      <a
        className="scroll-cue"
        href="#nosotros"
        aria-label="Desplazarse a Nosotros"
      >
        DESLIZAR <b>↓</b>
      </a>
    </section>
  );
}
