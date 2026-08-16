import { EXPERIENCE_CASES } from "@/config/site";

export function ExperienceSection() {
  return (
    <section className="experience section" id="experiencia">
      <div className="section-heading light reveal">
        <div>
          <p className="eyebrow dark">
            TRAYECTORIA PROFESIONAL <span />
          </p>
          <h2>
            Nuestra <em>experiencia</em>
          </h2>
        </div>
        <p>
          Cada caso representa un compromiso con nuestros clientes y sus
          intereses.
        </p>
      </div>

      <div className="case-list">
        {EXPERIENCE_CASES.map(({ tag, title, description }, index) => (
          <article className="case reveal" key={title}>
            <span className="case-index">0{index + 1}</span>
            <div>
              <small>{tag}</small>
              <h3>{title}</h3>
              <p>{description}</p>
            </div>
            <a href="#contacto" aria-label={`Consultar sobre ${title}`}>
              ↗
            </a>
          </article>
        ))}
      </div>

      <p className="placeholder-note dark-note">
        Contenido ilustrativo · Los casos reales se incorporarán únicamente con
        información autorizada por la firma.
      </p>
    </section>
  );
}
