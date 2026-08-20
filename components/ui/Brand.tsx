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
      <img
        className="brand-logo-full"
        src="/correa-logo-completo.png"
        alt="Correa & Asociados — Asesoría jurídica y representación legal"
      />
    </a>
  );
}
