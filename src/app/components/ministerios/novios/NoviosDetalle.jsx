import Link from 'next/link';

export default function NoviosDetalle({ ministerio, relacionados = [] }) {
  return (
    <>
      {/* Page Header */}
      <section className="page-header">
        <div className="page-header-overlay"></div>
        <div className="container">
          <h1>{ministerio.nombre}</h1>
          <nav className="breadcrumb" aria-label="breadcrumb">
            <Link href="/">Inicio</Link>
            <span>/</span>
            <Link href="/ministerios">Ministerios</Link>
            <span>/</span>
            <span>{ministerio.nombre}</span>
          </nav>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="detalle-layout">
            <div className="detalle-main">
              <div className="detalle-icon-large">
                <i className={`fas ${ministerio.icon}`}></i>
              </div>
              <h2>{ministerio.nombre}</h2>
              <p className="detalle-desc">{ministerio.descriptionLarga}</p>

              <h3>Actividades</h3>
              <ul className="actividades-list">
                {ministerio.actividades.map((a, i) => (
                  <li key={i}><i className="fas fa-check-circle"></i> {a}</li>
                ))}
              </ul>

              <div className="contacto-box">
                <h3>Contacto del Ministerio</h3>
                <p><i className="fas fa-user"></i> {ministerio.lider}</p>
                <p><i className="fas fa-envelope"></i> <a href={`mailto:${ministerio.contacto}`}>{ministerio.contacto}</a></p>
              </div>
            </div>

            <aside className="detalle-sidebar">
              <h3>Otros Ministerios</h3>
              <div className="sidebar-cards">
                {relacionados.map((m) => (
                  <Link href={`/ministerios/${m.id}`} key={m.id} className="sidebar-card">
                    <i className={`fas ${m.icon}`}></i>
                    <span>{m.nombre}</span>
                  </Link>
                ))}
              </div>
              <Link href="/ministerios" className="btn btn-outline btn-block">Ver todos</Link>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
