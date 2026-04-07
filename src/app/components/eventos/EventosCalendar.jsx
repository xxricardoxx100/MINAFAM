'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';

const DIAS = ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'];
const MESES = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre',
];

function toDate(fecha) {
  return new Date(`${fecha}T12:00:00`);
}

function formatDateKey(fecha) {
  const year = fecha.getFullYear();
  const month = String(fecha.getMonth() + 1).padStart(2, '0');
  const day = String(fecha.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export default function EventosCalendar({
  eventos,
  showCta = false,
  ctaHref = '/eventos',
  ctaLabel = 'Ver todos los eventos',
}) {
  const eventosOrdenados = useMemo(
    () => [...eventos].sort((a, b) => toDate(a.fecha) - toDate(b.fecha)),
    [eventos]
  );

  const mesInicial = useMemo(() => {
    if (eventosOrdenados.length === 0) {
      const hoy = new Date();
      return new Date(hoy.getFullYear(), hoy.getMonth(), 1);
    }

    const primeraFecha = toDate(eventosOrdenados[0].fecha);
    return new Date(primeraFecha.getFullYear(), primeraFecha.getMonth(), 1);
  }, [eventosOrdenados]);

  const [mesActual, setMesActual] = useState(mesInicial);
  const [fechaSeleccionada, setFechaSeleccionada] = useState(
    eventosOrdenados[0]?.fecha ?? formatDateKey(mesInicial)
  );

  const eventosPorFecha = useMemo(() => {
    const mapa = new Map();
    for (const evento of eventosOrdenados) {
      if (!mapa.has(evento.fecha)) {
        mapa.set(evento.fecha, []);
      }
      mapa.get(evento.fecha).push(evento);
    }
    return mapa;
  }, [eventosOrdenados]);

  useEffect(() => {
    const year = mesActual.getFullYear();
    const month = mesActual.getMonth();

    const primerEventoMes = eventosOrdenados.find((evento) => {
      const fechaEvento = toDate(evento.fecha);
      return fechaEvento.getFullYear() === year && fechaEvento.getMonth() === month;
    });

    if (primerEventoMes) {
      setFechaSeleccionada(primerEventoMes.fecha);
      return;
    }

    setFechaSeleccionada(formatDateKey(new Date(year, month, 1)));
  }, [mesActual, eventosOrdenados]);

  const year = mesActual.getFullYear();
  const month = mesActual.getMonth();
  const primerDiaSemana = new Date(year, month, 1).getDay();
  const diasDelMes = new Date(year, month + 1, 0).getDate();
  const celdas = Array.from({ length: primerDiaSemana + diasDelMes }, (_, index) => {
    const dia = index - primerDiaSemana + 1;
    return dia > 0 ? dia : null;
  });

  const eventosDelDia = eventosPorFecha.get(fechaSeleccionada) ?? [];
  const eventoPrincipal = eventosDelDia[0] ?? null;

  const eventosEnMesActual = useMemo(
    () =>
      eventosOrdenados.filter((evento) => {
        const fechaEvento = toDate(evento.fecha);
        return fechaEvento.getFullYear() === year && fechaEvento.getMonth() === month;
      }),
    [eventosOrdenados, year, month]
  );

  return (
    <>
      <div className="eventos-calendar-shell">
        <div className="calendar-panel">
          <div className="calendar-title-row">
            <h3><i className="fas fa-calendar-alt"></i> Calendario de Eventos</h3>
          </div>

          <div className="calendar-controls">
            <button
              type="button"
              className="calendar-nav"
              onClick={() => setMesActual(new Date(year, month - 1, 1))}
              aria-label="Mes anterior"
            >
              <i className="fas fa-chevron-left"></i>
            </button>
            <h4>{MESES[month]} {year}</h4>
            <button
              type="button"
              className="calendar-nav"
              onClick={() => setMesActual(new Date(year, month + 1, 1))}
              aria-label="Mes siguiente"
            >
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>

          <div className="calendar-weekdays">
            {DIAS.map((dia) => (
              <span key={dia}>{dia}</span>
            ))}
          </div>

          <div className="calendar-days-grid">
            {celdas.map((dia, index) => {
              if (!dia) {
                return <span key={`empty-${index}`} className="calendar-day-empty" aria-hidden="true"></span>;
              }

              const fecha = new Date(year, month, dia);
              const dateKey = formatDateKey(fecha);
              const tieneEvento = eventosPorFecha.has(dateKey);
              const esSeleccionada = fechaSeleccionada === dateKey;

              return (
                <button
                  key={dateKey}
                  type="button"
                  className={`calendar-day${tieneEvento ? ' has-event' : ''}${esSeleccionada ? ' selected' : ''}`}
                  onClick={() => setFechaSeleccionada(dateKey)}
                  aria-label={
                    tieneEvento
                      ? `Seleccionar ${dia} de ${MESES[month]}, con evento`
                      : `Seleccionar ${dia} de ${MESES[month]}`
                  }
                >
                  <span>{dia}</span>
                  {tieneEvento && <i className="event-dot"></i>}
                </button>
              );
            })}
          </div>

          <div className="calendar-legend">
            <span><i className="legend-box legend-box-outline"></i> Con evento</span>
            <span><i className="legend-box legend-box-fill"></i> Seleccionado</span>
          </div>
        </div>

        <div className="evento-banner-panel">
          {eventoPrincipal ? (
            <article className="evento-banner" key={eventoPrincipal.id}>
              <div className="evento-banner-media">
                <img
                  src={`https://placehold.co/720x360/c0392b/ffffff?text=${encodeURIComponent(eventoPrincipal.nombre)}`}
                  alt={eventoPrincipal.nombre}
                />
                {eventoPrincipal.featured && <span className="evento-badge">Destacado</span>}
              </div>
              <div className="evento-banner-content">
                <p className="evento-banner-date">
                  <i className="fas fa-calendar-alt"></i>
                  {toDate(eventoPrincipal.fecha).toLocaleDateString('es-ES', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </p>
                <h3>{eventoPrincipal.nombre}</h3>
                <p>{eventoPrincipal.descripcion}</p>

                <div className="evento-banner-meta">
                  <span><i className="fas fa-map-marker-alt"></i> {eventoPrincipal.ubicacion}</span>
                  <span><i className="fas fa-clock"></i> {eventoPrincipal.hora_inicio}</span>
                </div>

                {eventosDelDia.length > 1 && (
                  <p className="evento-extra-count">Hay {eventosDelDia.length - 1} evento(s) adicional(es) en esta fecha.</p>
                )}

                <Link href="/eventos" className="btn btn-sm btn-primary">Ver detalles</Link>
              </div>
            </article>
          ) : (
            <div className="evento-empty">
              <i className="fas fa-calendar-day"></i>
              <h3>{eventosEnMesActual.length === 0 ? 'No hay eventos este mes' : 'No hay eventos esta fecha'}</h3>
              <p>
                {eventosEnMesActual.length === 0
                  ? 'Selecciona otro mes para ver los próximos eventos.'
                  : 'Prueba con otro día que tenga marca de evento en el calendario.'}
              </p>
            </div>
          )}
        </div>
      </div>

      {showCta && (
        <div className="section-cta">
          <Link href={ctaHref} className="btn btn-outline">{ctaLabel}</Link>
        </div>
      )}
    </>
  );
}