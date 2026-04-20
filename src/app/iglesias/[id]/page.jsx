import iglesias from '../../../../data/iglesias.json';
import eventos from '../../../../data/eventos.json';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getEventoFechas, getEventosOrdenados } from '../../../utils/eventos';

const iglesiasActivas = iglesias.filter((iglesia) => iglesia.activa !== false);

export async function generateStaticParams() {
  return iglesiasActivas.map((i) => ({ id: i.id }));
}

export async function generateMetadata({ params }) {
  const ig = iglesiasActivas.find((x) => x.id === params.id);
  return { title: ig ? `${ig.nombre} - MINAFAM` : 'Iglesia - MINAFAM' };
}

export default function IglesiaDetallePage({ params }) {
  const iglesia = iglesiasActivas.find((i) => i.id === params.id);
  if (!iglesia) notFound();

  const eventosIglesia = getEventosOrdenados(eventos.filter((e) => e.iglesia === iglesia.id));
  const relacionadas = iglesiasActivas.filter((i) => i.id !== iglesia.id).slice(0, 3);
  const mostrarSidebar = relacionadas.length > 0;
  const datosContacto = [
    { icono: 'fa-map-marker-alt', texto: iglesia.direccion },
    { icono: 'fa-phone', texto: iglesia.telefono },
    { icono: 'fa-envelope', texto: iglesia.email, tipo: 'email' },
    { icono: 'fa-clock', texto: iglesia.servicios },
    { icono: 'fa-user-tie', texto: iglesia.pastor },
    { icono: 'fa-users', texto: iglesia.miembros ? `${iglesia.miembros} miembros` : '' },
  ].filter((item) => item.texto);

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
          <div className={`detalle-layout iglesia-detalle-layout${mostrarSidebar ? '' : ' iglesia-detalle-sin-sidebar'}`}>
            {/* Main Content */}
            <div className="detalle-main iglesia-detalle-main">
              <div className="iglesia-detalle-hero">
                <div className="iglesia-featured-media">
                  <img
                    className="iglesia-featured-img"
                    src={
                      iglesia.imagen ||
                      `https://placehold.co/800x600/2c3e50/ffffff?text=${encodeURIComponent(iglesia.nombre)}`
                    }
                    alt={iglesia.nombre}
                  />
                </div>

                <div className="iglesia-detalle-intro">
                  <p className="iglesia-detalle-tag">Nuestra Iglesia</p>
                  <h2>{iglesia.nombre}</h2>
                  <p className="iglesia-detalle-desc">{iglesia.descripcion}</p>
                </div>
              </div>

              <div className="contacto-box iglesia-detalle-contacto">
                <h3>Información de Contacto</h3>
                <div className="iglesia-contact-grid">
                  {datosContacto.map((item, index) => (
                    <p key={`${item.icono}-${index}`} className="iglesia-contact-item">
                      <i className={`fas ${item.icono}`}></i>
                      {item.tipo === 'email' ? (
                        <a href={`mailto:${item.texto}`}>{item.texto}</a>
                      ) : (
                        <span>{item.texto}</span>
                      )}
                    </p>
                  ))}
                </div>

                {iglesia.coordenadas?.lat && iglesia.coordenadas?.lng && (
                  <a
                    href={`https://maps.google.com/?q=${iglesia.coordenadas.lat},${iglesia.coordenadas.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-sm btn-outline iglesia-detalle-map-btn"
                  >
                    <i className="fas fa-map"></i> Ver en Google Maps
                  </a>
                )}
              </div>

              {eventosIglesia.length > 0 && (
                <>
                  <h3>Próximos Eventos en esta Iglesia</h3>
                  <div className="eventos-mini-list">
                    {eventosIglesia.map((ev) => {
                      const primeraSesion = getEventoFechas(ev)[0];

                      return (
                        <div className="evento-mini" key={ev.id}>
                          <span className="evento-mini-date">
                            {primeraSesion
                              ? new Date(`${primeraSesion.fecha}T12:00:00`).toLocaleDateString('es-ES', {
                                  day: 'numeric', month: 'short',
                                })
                              : '--'}
                          </span>
                          <div>
                            <strong>{ev.nombre}</strong>
                            <p>{ev.descripcion}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
            </div>

            {/* Sidebar */}
            {mostrarSidebar && (
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
            )}
          </div>
        </div>
      </section>
    </>
  );
}
