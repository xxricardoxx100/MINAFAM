import iglesias from '../../../../data/iglesias.json';
import eventos from '../../../../data/eventos.json';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  return iglesias.map((i) => ({ id: i.id }));
}

export async function generateMetadata({ params }) {
  const ig = iglesias.find((x) => x.id === params.id);
  return { title: ig ? `${ig.nombre} - MINAFAM` : 'Iglesia - MINAFAM' };
}

export default function IglesiaDetallePage({ params }) {
  const iglesia = iglesias.find((i) => i.id === params.id);
  if (!iglesia) notFound();

  const eventosIglesia = eventos.filter((e) => e.iglesia === iglesia.id);
  const relacionadas = iglesias.filter((i) => i.id !== iglesia.id).slice(0, 3);

  return (
    <>
      {/* Page Header */}
      <section className="page-header">
        <div className="page-header-overlay"></div>
        <div className="container">
          <h1>{iglesia.nombre}</h1>
          <nav className="breadcrumb" aria-label="breadcrumb">
            <Link href="/">Inicio</Link>
            <span>/</span>
            <Link href="/iglesias">Iglesias</Link>
            <span>/</span>
            <span>{iglesia.nombre}</span>
          </nav>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="detalle-layout">
            {/* Main Content */}
            <div className="detalle-main">
              <img
                className="iglesia-featured-img"
                src={`https://placehold.co/800x350/2c3e50/ffffff?text=${encodeURIComponent(iglesia.nombre)}`}
                alt={iglesia.nombre}
              />
              <h2>{iglesia.nombre}</h2>
              <p className="detalle-desc">{iglesia.descripcion}</p>

              <div className="contacto-box">
                <h3>Información de Contacto</h3>
                <p><i className="fas fa-map-marker-alt"></i> {iglesia.direccion}</p>
                <p><i className="fas fa-phone"></i> {iglesia.telefono}</p>
                <p><i className="fas fa-envelope"></i> <a href={`mailto:${iglesia.email}`}>{iglesia.email}</a></p>
                <p><i className="fas fa-clock"></i> {iglesia.servicios}</p>
                <p><i className="fas fa-user-tie"></i> {iglesia.pastor}</p>
                <p><i className="fas fa-users"></i> {iglesia.miembros} miembros</p>
                <a
                  href={`https://maps.google.com/?q=${iglesia.coordenadas?.lat},${iglesia.coordenadas?.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-sm btn-outline"
                >
                  <i className="fas fa-map"></i> Ver en Google Maps
                </a>
              </div>

              {eventosIglesia.length > 0 && (
                <>
                  <h3>Próximos Eventos en esta Iglesia</h3>
                  <div className="eventos-mini-list">
                    {eventosIglesia.map((ev) => (
                      <div className="evento-mini" key={ev.id}>
                        <span className="evento-mini-date">
                          {new Date(ev.fecha + 'T12:00:00').toLocaleDateString('es-ES', {
                            day: 'numeric', month: 'short',
                          })}
                        </span>
                        <div>
                          <strong>{ev.nombre}</strong>
                          <p>{ev.descripcion}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Sidebar */}
            <aside className="detalle-sidebar">
              <h3>Otras Iglesias</h3>
              <div className="sidebar-cards">
                {relacionadas.map((ig) => (
                  <Link href={`/iglesias/${ig.id}`} key={ig.id} className="sidebar-card">
                    <i className="fas fa-church"></i>
                    <span>{ig.nombre}</span>
                  </Link>
                ))}
              </div>
              <Link href="/iglesias" className="btn btn-outline btn-block">Ver todas</Link>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
