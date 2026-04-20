'use client';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand">
          <div className="footer-logo">
            <img
              src="https://placehold.co/50x50/ffffff/c0392b?text=MF&font=montserrat"
              alt="Logo MINAFAM"
            />
            <span>MINAFAM</span>
          </div>
          <p>Transformando vidas, fortaleciendo familias y construyendo comunidad a través de la fe.</p>
          <div className="footer-social">
            <a href="#" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
            <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
            <a href="#" aria-label="YouTube"><i className="fab fa-youtube"></i></a>
            <a href="#" aria-label="WhatsApp"><i className="fab fa-whatsapp"></i></a>
          </div>
        </div>

        <div className="footer-links">
          <h4>Navegación</h4>
          <ul>
            <li><Link href="/">Inicio</Link></li>
            <li><Link href="/ministerios">Ministerios</Link></li>
            <li><Link href="/iglesias">Iglesias</Link></li>
            <li><Link href="/eventos">Eventos</Link></li>
            <li><Link href="/cursos">Cursos</Link></li>
            <li><Link href="/contacto">Contacto</Link></li>
          </ul>
        </div>

        <div className="footer-links">
          <h4>Ministerios</h4>
          <ul>
            <li><Link href="/ministerios/familias">Matrimonios y Familias</Link></li>
            <li><Link href="/ministerios/matrimonios">Jóvenes</Link></li>
            <li><Link href="/ministerios/matrimonios">Novios</Link></li>
            <li><Link href="/ministerios/matrimonios">Finanzas</Link></li>
          </ul>
        </div>

        <div className="footer-newsletter">
          <h4>Newsletter</h4>
          <p>Recibe novedades de nuestros eventos y actividades.</p>
          <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Tu correo electrónico" required />
            <button type="submit" className="btn btn-primary">Suscribirse</button>
          </form>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} MINAFAM – Ministerio Nacional de Familias. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}
