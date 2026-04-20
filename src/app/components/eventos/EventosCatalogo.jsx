'use client';

import { useMemo, useState } from 'react';
import EventosCalendar from './EventosCalendar';
import RegistroInscripcionPopup from './RegistroInscripcionPopup';
import { expandEventosPorFechas, getEventoFechas, getEventosOrdenados } from '../../../utils/eventos';

function getMinisterioEvento(evento) {
  return evento.ministerio || 'General';
}

export default function EventosCatalogo({ eventos }) {
  const [ministerioActivo, setMinisterioActivo] = useState('todos');
  const [eventoRegistroActivo, setEventoRegistroActivo] = useState(null);

  const eventosOrdenados = useMemo(() => getEventosOrdenados(eventos), [eventos]);

  const ministeriosDisponibles = useMemo(
    () => [...new Set(eventosOrdenados.map((evento) => getMinisterioEvento(evento)))],
    [eventosOrdenados]
  );

  const eventosFiltrados = useMemo(
    () =>
      ministerioActivo === 'todos'
        ? eventosOrdenados
        : eventosOrdenados.filter((evento) => getMinisterioEvento(evento) === ministerioActivo),
    [eventosOrdenados, ministerioActivo]
  );

  const eventosCalendario = useMemo(
    () => expandEventosPorFechas(eventosFiltrados),
    [eventosFiltrados]
  );

  return (
    <>
      <section className="section eventos-listado-section">
        <div className="container">
          <div className="eventos-filtros" role="tablist" aria-label="Filtrar eventos por ministerio">
            <button
              type="button"
              className={`eventos-filtro-chip${ministerioActivo === 'todos' ? ' active' : ''}`}
              onClick={() => setMinisterioActivo('todos')}
              aria-pressed={ministerioActivo === 'todos'}
            >
              Todos
            </button>
            {ministeriosDisponibles.map((ministerio) => (
              <button
                key={ministerio}
                type="button"
                className={`eventos-filtro-chip${ministerioActivo === ministerio ? ' active' : ''}`}
                onClick={() => setMinisterioActivo(ministerio)}
                aria-pressed={ministerioActivo === ministerio}
              >
                {ministerio}
              </button>
            ))}
          </div>

          <div className="eventos-connector" aria-hidden="true">
            <span>Resultados</span>
          </div>

          <div className="eventos-list">
            {eventosFiltrados.length === 0 ? (
              <div className="no-events">
                <i className="fas fa-filter"></i>
                <h3>Sin eventos para este ministerio</h3>
                <p>Prueba con otro filtro para ver más actividades.</p>
              </div>
            ) : (
              eventosFiltrados.map((ev) => {
                const fechas = getEventoFechas(ev);
                const horarios = [
                  ...new Set(
                    fechas
                      .map((sesion) => {
                        if (!sesion.hora_inicio || !sesion.hora_fin) return '';
                        return `${sesion.hora_inicio} – ${sesion.hora_fin}`;
                      })
                      .filter(Boolean)
                  ),
                ];

                return (
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
                      {Array.isArray(ev.tags) && ev.tags.length > 0 && (
                        <div className="evento-tags">
                          {ev.tags.map((tag) => (
                            <span className="tag" key={tag}>{tag}</span>
                          ))}
                        </div>
                      )}
                      <h2>{ev.nombre}</h2>
                      <p>{ev.descriptionLarga}</p>
                      <ul className="evento-detalles">
                        {horarios.length > 0 && (
                          <li><i className="fas fa-clock"></i> {horarios.join(' • ')}</li>
                        )}
                        <li><i className="fas fa-map-marker-alt"></i> {ev.ubicacion}</li>
                        <li><i className="fas fa-ticket-alt"></i> {ev.precio}</li>
                      </ul>
                      <div className="evento-full-actions">
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={() => setEventoRegistroActivo(ev)}
                        >
                          Registrarse
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </section>

      <section className="section eventos-calendario-section">
        <div className="container">
          <div className="section-header" style={{ marginBottom: '32px' }}>
            <span className="section-tag">Calendario</span>
            <h2>Explora por fecha</h2>
            <p>Haz clic en un día para ver el evento destacado de esa fecha.</p>
          </div>

          <EventosCalendar eventos={eventosCalendario} />
        </div>
      </section>

      <RegistroInscripcionPopup
        evento={eventoRegistroActivo}
        onClose={() => setEventoRegistroActivo(null)}
      />
    </>
  );
}
