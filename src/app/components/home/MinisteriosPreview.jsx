import Link from 'next/link';

export default function MinisteriosPreview({ ministerios }) {
  const isCompact = ministerios.length <= 2;

  return (
    <section className="section section-ministerios-preview ministerios-section">
      <div className="container">
        <div className="section-header light">
          <span className="section-tag">Nuestro trabajo</span>
          <h2 className="section-title">Ministerios</h2>
          <p className="section-desc">
            Cada ministerio es un brazo de amor que llega a diferentes necesidades de la comunidad.
          </p>
        </div>
        <div className={`ministerios-grid${isCompact ? ' ministerios-grid-compact' : ''}`}>
          {ministerios.slice(0, 6).map((ministerio) => (
            <div className="ministerio-card" key={ministerio.id}>
              <div className="ministerio-icon">
                <i className={`fas ${ministerio.icon}`}></i>
              </div>
              <h3>{ministerio.nombre}</h3>
              <p>{ministerio.descripcion}</p>
              <Link href={`/ministerios/${ministerio.id}`} className="ministerio-link">
                Saber más <i className="fas fa-arrow-right"></i>
              </Link>
            </div>
          ))}
        </div>
        <div className="section-cta">
          <Link href="/ministerios" className="btn btn-primary">Ver todos los ministerios</Link>
        </div>
      </div>
    </section>
  );
}
