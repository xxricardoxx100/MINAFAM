import Link from 'next/link';

export const metadata = {
  title: '¿Cómo ser parte? - MINAFAM',
};

export default function ComoSerPartePage() {
  const pasos = [
    {
      numero: '01',
      icon: 'fa-church',
      titulo: 'Visítanos',
      desc: 'Ven a uno de nuestros servicios dominicales. No necesitas cita previa, solo llega y te recibiremos con alegría.',
    },
    {
      numero: '02',
      icon: 'fa-handshake',
      titulo: 'Conéctate',
      desc: 'Únete a uno de nuestros grupos pequeños donde podrás conocer más personas y crecer en comunidad.',
    },
    {
      numero: '03',
      icon: 'fa-book-open',
      titulo: 'Crece',
      desc: 'Participa en nuestros cursos, talleres y retiros para profundizar tu fe y desarrollar tu potencial.',
    },
    {
      numero: '04',
      icon: 'fa-hands-helping',
      titulo: 'Sirve',
      desc: 'Descubre tus dones y ponlos al servicio de la comunidad en uno de nuestros ministerios.',
    },
  ];

  const beneficios = [
    { icon: 'fa-heart', titulo: 'Comunidad auténtica', desc: 'Relaciones reales en un ambiente de amor y aceptación.' },
    { icon: 'fa-seedling', titulo: 'Crecimiento espiritual', desc: 'Recursos y acompañamiento para tu caminar de fe.' },
    { icon: 'fa-users', titulo: 'Familias fortalecidas', desc: 'Programas específicos para cada etapa familiar.' },
    { icon: 'fa-globe', titulo: 'Impacto social', desc: 'Proyectos que transforman la comunidad.' },
    { icon: 'fa-music', titulo: 'Alabanza y adoración', desc: 'Encuentros genuinos con Dios a través de la música.' },
    { icon: 'fa-graduation-cap', titulo: 'Formación continua', desc: 'Escuela bíblica y capacitación para líderes.' },
  ];

  return (
    <>
      <section className="page-header">
        <div className="page-header-overlay"></div>
        <div className="container">
          <h1>¿Cómo ser parte?</h1>
          <p>Tu camino con nosotros comienza con un paso. Te guiamos en cada etapa.</p>
          <nav className="breadcrumb" aria-label="breadcrumb">
            <Link href="/">Inicio</Link>
            <span>/</span>
            <span>¿Cómo ser parte?</span>
          </nav>
        </div>
      </section>

      {/* Pasos */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">El proceso</span>
            <h2 className="section-title">Tu viaje en 4 pasos</h2>
          </div>
          <div className="pasos-grid">
            {pasos.map((paso) => (
              <div className="paso-card-full" key={paso.numero}>
                <div className="paso-numero">{paso.numero}</div>
                <div className="paso-icon"><i className={`fas ${paso.icon}`}></i></div>
                <h3>{paso.titulo}</h3>
                <p>{paso.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Beneficios */}
      <section className="section section-gray">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">¿Por qué elegirnos?</span>
            <h2 className="section-title">Lo que encontrarás aquí</h2>
          </div>
          <div className="beneficios-grid">
            {beneficios.map((b) => (
              <div className="beneficio-card" key={b.titulo}>
                <i className={`fas ${b.icon}`}></i>
                <h3>{b.titulo}</h3>
                <p>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section section-cta-final">
        <div className="container">
          <div className="cta-box">
            <h2>¿Tienes preguntas?</h2>
            <p>Nuestro equipo está listo para ayudarte a dar el primer paso.</p>
            <div className="cta-btns">
              <Link href="/contacto" className="btn btn-primary">Contáctanos</Link>
              <Link href="/iglesias" className="btn btn-outline-white">Ver iglesias</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
