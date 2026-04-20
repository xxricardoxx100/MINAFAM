import eventos from '../../../data/eventos.json';
import Link from 'next/link';
import EventosCatalogo from '../components/eventos/EventosCatalogo';

export const metadata = {
  title: 'Eventos - MINAFAM',
};

export default function EventosPage() {
  return (
    <>
      <section className="page-header">
        <div className="page-header-overlay"></div>
        <div className="container">
          <h1>Nuestros Eventos y Cursos</h1>
          <p>Actividades, celebraciones y encuentros especiales para toda la familia.</p>
          
        </div>
      </section>

      <EventosCatalogo eventos={eventos} />
    </>
  );
}
