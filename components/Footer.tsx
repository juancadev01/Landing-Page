import { CONTACT, NAV_ITEMS } from "@/config/site";
import { Brand } from "@/components/ui/Brand";

export function Footer() {
  return (
    <footer>
      <div className="footer-main">
        <div className="footer-brand">
          <Brand />
          <p>
            Asesoría jurídica y representación legal
            <br />
            con compromiso y confianza.
          </p>
        </div>

        <div>
          <h3>Navegación</h3>
          {NAV_ITEMS.map(({ label, id }) => (
            <a href={`#${id}`} key={id}>
              {label}
            </a>
          ))}
        </div>

        <div>
          <h3>Contacto</h3>
          <p>{CONTACT.phone}</p>
          <p>{CONTACT.email}</p>
          <p>{CONTACT.city}</p>
        </div>

        <div id="privacidad">
          <h3>Información legal</h3>
          <a href="#privacidad">Política de privacidad</a>
          <a href="#privacidad">Tratamiento de datos</a>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} Correa &amp; Asociados. Todos los derechos
          reservados.
        </p>
        <p>Defensa · Estrategia · Confianza</p>
      </div>
    </footer>
  );
}
