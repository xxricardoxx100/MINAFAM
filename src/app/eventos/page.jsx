import eventos from '../../../data/eventos.json';
import Link from 'next/link';
import EventosCalendar from '../components/eventos/EventosCalendar';

export const metadata = {
  title: 'Eventos - MINAFAM',
};

export default function EventosPage() {
  const eventosOrdenados = [...eventos].sort(
    (a, b) => new Date(`${a.fecha}T12:00:00`) - new Date(`${b.fecha}T12:00:00`)
  );

  return (
    <>
      <section className="page-header">
        <div className="page-header-overlay"></div>
        <div className="container">
          <h1>Próximos Eventos</h1>
          <p>Actividades, celebraciones y encuentros especiales para toda la familia.</p>
          <nav className="breadcrumb" aria-label="breadcrumb">
            <Link href="/">Inicio</Link>
            <span>/</span>
            <span>Eventos</span>
          </nav>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-header" style={{ marginBottom: '32px' }}>
            <span className="section-tag">Calendario</span>
            <h2>Explora por fecha</h2>
            <p>Haz clic en un día para ver el evento destacado de esa fecha.</p>
          </div>

          <EventosCalendar eventos={eventosOrdenados} />
        </div>
      </section>

      <section className="section" style={{ paddingTop: '20px' }}>
        <div className="container">
          <div className="eventos-list">
            {eventosOrdenados.map((ev) => (
              <div className="evento-full-card" key={ev.id}>
                <div className="evento-full-img">
                  <img
                    src={
                      ev.imagen ||
                      `https://placehold.co/350x220/c0392b/ffffff?text=${encodeURIComponent(ev.nombre)}`
                    }
                    alt={ev.nombre}
                  />
                  {ev.featured && <span className="evento-badge">Destacado</span>}
                </div>
                <div className="evento-full-body">
                  <div className="evento-tags">
                    {ev.tags?.map((tag) => (
                      <span className="tag" key={tag}>{tag}</span>
                    ))}
                  </div>
                  <h2>{ev.nombre}</h2>
                  <p>{ev.descriptionLarga}</p>
                  <ul className="evento-detalles">
                    <li>
                      <i className="fas fa-calendar-alt"></i>
                      {new Date(ev.fecha + 'T12:00:00').toLocaleDateString('es-ES', {
                        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
                      })}
                    </li>
                    <li><i className="fas fa-clock"></i> {ev.hora_inicio} – {ev.hora_fin}</li>
                    <li><i className="fas fa-map-marker-alt"></i> {ev.ubicacion}</li>
                    <li><i className="fas fa-ticket-alt"></i> {ev.precio}</li>
                    <li><i className="fas fa-users"></i> Capacidad: {ev.capacidad} personas</li>
                  </ul>
                  <button className="btn btn-primary">Registrarse</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
