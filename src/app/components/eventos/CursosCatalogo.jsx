'use client';

import { useMemo, useState } from 'react';
import RegistroInscripcionPopup from './RegistroInscripcionPopup';
import { getEventoFechas, getEventosOrdenados } from '../../../utils/eventos';

function isCurso(evento) {
  return String(evento?.ministerio || '').trim().toLowerCase() !== 'general';
}

export default function CursosCatalogo({ eventos }) {
  const [eventoRegistroActivo, setEventoRegistroActivo] = useState(null);

  const cursos = useMemo(
    () => getEventosOrdenados((eventos || []).filter((evento) => isCurso(evento))),
    [eventos]
  );

  return (
    <>
      <section className="section cursos-section">
        <div className="container">
          {cursos.length === 0 ? (
            <div className="no-events">
              <i className="fas fa-book-open"></i>
              <h3>No hay cursos disponibles</h3>
              <p>Pronto publicaremos nuevas fechas de inscripción.</p>
            </div>
          ) : (
            <div className="cursos-grid-2x2">
              {cursos.map((ev) => {
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
                  <article className="evento-full-card curso-evento-card" key={ev.id}>
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
                      <h2>{ev.nombre}</h2>
                      <p>{ev.descripcion || ev.descriptionLarga}</p>

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
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <RegistroInscripcionPopup
        evento={eventoRegistroActivo}
        onClose={() => setEventoRegistroActivo(null)}
      />
    </>
  );
}
