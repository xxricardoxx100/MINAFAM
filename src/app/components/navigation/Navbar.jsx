'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: 'Inicio' },
    { href: '/eventos', label: 'Eventos' },
    { href: '/ministerios', label: 'Ministerios' },
    { href: '/iglesias', label: 'Iglesias' },
    { href: '/cursos', label: 'Cursos' },
  ];

  return (
    <header id="navbar" className={scrolled ? 'scrolled' : ''}>
      <div className="nav-container">
        <Link href="/" className="logo">
          <img
            src="https://placehold.co/50x50/ffffff/c0392b?text=MF&font=montserrat"
            alt="Logo MINAFAM"
          />
          <span>MINAFAM</span>
        </Link>

        <nav>
          <ul className={`nav-links${menuOpen ? ' open' : ''}`} id="navLinks">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`nav-link${pathname === link.href ? ' active' : ''}`}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/contacto" className="nav-link btn-contacto" onClick={() => setMenuOpen(false)}>
                Contacto
              </Link>
            </li>
          </ul>
        </nav>

        <button
          className={`hamburger${menuOpen ? ' open' : ''}`}
          id="hamburger"
          aria-label="Abrir menú"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
}
