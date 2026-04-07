import ministerios from '../../../data/ministerios.json';
import Link from 'next/link';

export const metadata = {
  title: 'Ministerios - MINAFAM',
};

export default function MinisteriosPage() {
  return (
    <>
      {/* Page Header */}
      <section className="page-header">
        <div className="page-header-overlay"></div>
        <div className="container">
          <h1>Nuestros Ministerios</h1>
          <p>Cada ministerio es un brazo de amor que llega a diferentes necesidades de la comunidad.</p>
          <nav className="breadcrumb" aria-label="breadcrumb">
            <Link href="/">Inicio</Link>
            <span>/</span>
            <span>Ministerios</span>
          </nav>
        </div>
      </section>

      {/* Grid */}
      <section className="section">
        <div className="container">
          <div className="ministerios-grid ministerios-grid-full">
            {ministerios.map((m) => (
              <div className="ministerio-card" key={m.id}>
                <div className="ministerio-icon">
                  <i className={`fas ${m.icon}`}></i>
                </div>
                <h3>{m.nombre}</h3>
                <p>{m.descripcion}</p>
                <ul className="ministerio-actividades-mini">
                  {m.actividades.slice(0, 2).map((a, i) => (
                    <li key={i}><i className="fas fa-check"></i> {a}</li>
                  ))}
                </ul>
                <div className="ministerio-footer">
                  <span className="ministerio-lider">
                    <i className="fas fa-user"></i> {m.lider}
                  </span>
                  <Link href={`/ministerios/${m.id}`} className="btn btn-sm btn-primary">
                    Ver más
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
