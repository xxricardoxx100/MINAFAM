import './globals.css';
import Navbar from './components/navigation/Navbar';
import Footer from './components/navigation/Footer';

export const metadata = {
  title: 'MINAFAM - Ministero Nacional de matrimonios y familias',
  description: 'Transformando vidas, fortaleciendo familias y construyendo comunidad a través de la fe, el amor y el servicio.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;800&family=Open+Sans:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <a href="#top" className="back-to-top" id="backToTop" aria-label="Volver arriba">
          <i className="fas fa-chevron-up"></i>
        </a>
      </body>
    </html>
  );
}
