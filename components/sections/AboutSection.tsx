import { PRINCIPLES } from "@/config/site";

export function AboutSection() {
  return (
    <section className="about section" id="nosotros">
      <div className="about-image about-image-left reveal">
        <div
          className="image-frame image-frame-left"
          role="img"
          aria-label="Profesionales revisando documentos jurídicos"
        />
        <div className="photo-watermark" aria-hidden="true">
          <span className="watermark-mark" />
          <b>CORREA &amp; ASOCIADOS</b>
        </div>
      </div>

      <div className="about-copy reveal">
        <p className="eyebrow dark">
          QUIÉNES SOMOS <span />
        </p>
        <h2>
          Experiencia jurídica
          <br />
          <em>a su servicio</em>
        </h2>
        <p className="lead">
          Correa &amp; Asociados es una firma comprometida con la defensa de los
          intereses de sus clientes.
        </p>
        <p>
          Nuestro trabajo se fundamenta en el análisis jurídico riguroso, la
          atención personalizada y la búsqueda de soluciones efectivas para cada
          situación.
        </p>

        <div className="principles">
          {PRINCIPLES.map((principle, index) => (
            <div key={principle}>
              <b>0{index + 1}</b>
              <span>{principle}</span>
            </div>
          ))}
        </div>

        <a className="text-link" href="#contacto">
          CONVERSE CON NUESTRO EQUIPO <span>→</span>
        </a>
      </div>

      <div className="about-image about-image-right reveal">
        <div
          className="image-frame image-frame-right"
          role="img"
          aria-label="Reunión profesional en una oficina jurídica"
        />
        <div className="photo-watermark" aria-hidden="true">
          <span className="watermark-mark" />
          <b>CORREA &amp; ASOCIADOS</b>
        </div>
      </div>
    </section>
  );
}
