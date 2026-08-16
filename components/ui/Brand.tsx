type BrandProps = {
  onClick?: () => void;
};

export function Brand({ onClick }: BrandProps) {
  return (
    <a
      className="brand"
      href="#inicio"
      aria-label="Correa & Asociados, inicio"
      onClick={onClick}
    >
      <span className="brand-mark official-mark" aria-hidden="true" />
      <span className="brand-name">
        <b>CORREA &amp; ASOCIADOS</b>
      </span>
    </a>
  );
}
