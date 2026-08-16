import type { CSSProperties } from "react";
import { SERVICES } from "@/config/site";

export function ServicesSection() {
  return (
    <section className="services section" id="servicios">
      <div className="section-heading reveal">
        <div>
          <p className="eyebrow">
            ÁREAS DE PRÁCTICA <span />
          </p>
          <h2>
            Nuestros <em>servicios</em>
          </h2>
        </div>
        <p>
          Soluciones jurídicas claras, estratégicas y construidas para responder
          a las particularidades de cada caso.
        </p>
      </div>

      <div className="service-grid">
        {SERVICES.map(({ icon, title, description }, index) => (
          <article
            className="service-card reveal"
            style={{ "--delay": `${index * 45}ms` } as CSSProperties}
            key={title}
          >
            <span className="service-number">0{index + 1}</span>
            <i>{icon}</i>
            <h3>{title}</h3>
            <p>{description}</p>
            <a href="#contacto" aria-label={`Más información sobre ${title}`}>
              Más información <span>↗</span>
            </a>
          </article>
        ))}
      </div>

      <p className="placeholder-note">
        Áreas de práctica provisionales · Se actualizarán con los servicios
        confirmados por la firma.
      </p>
    </section>
  );
}
