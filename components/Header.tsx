"use client";

import { useEffect, useState } from "react";
import { NAV_ITEMS } from "@/config/site";
import { Brand } from "@/components/ui/Brand";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={scrolled ? "site-header is-scrolled" : "site-header"}>
      <Brand onClick={closeMenu} />

      <button
        className="menu-button"
        onClick={() => setMenuOpen((open) => !open)}
        aria-expanded={menuOpen}
        aria-controls="main-nav"
        aria-label="Abrir menú"
      >
        <span />
        <span />
      </button>

      <nav
        id="main-nav"
        className={menuOpen ? "nav open" : "nav"}
        aria-label="Navegación principal"
      >
        {NAV_ITEMS.map(({ label, id }) => (
          <a href={`#${id}`} onClick={closeMenu} key={id}>
            {label}
          </a>
        ))}
        <a className="nav-cta" href="#contacto" onClick={closeMenu}>
          Solicitar asesoría <span>↗</span>
        </a>
      </nav>
    </header>
  );
}
