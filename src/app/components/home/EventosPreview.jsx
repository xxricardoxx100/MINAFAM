import EventosCalendar from '../eventos/EventosCalendar';

export default function EventosPreview({ eventos }) {
  return (
    <section className="section section-eventos-preview">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Próximamente</span>
          <h2 className="section-title">Próximos Eventos</h2>
          <p className="section-desc">Selecciona una fecha para ver su banner e información.</p>
        </div>

        <EventosCalendar eventos={eventos} showCta={true} ctaHref="/eventos" ctaLabel="Ver todos los eventos" />
      </div>
    </section>
  );
}
