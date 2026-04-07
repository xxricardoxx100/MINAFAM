import ministerios from '../../data/ministerios.json';
import eventos from '../../data/eventos.json';
import testimonios from '../../data/testimonios.json';
import Hero from './components/home/Hero';
import StatsBar from './components/home/StatsBar';
import EventosPreview from './components/home/EventosPreview';
import MinisteriosPreview from './components/home/MinisteriosPreview';
import TestimoniosCarousel from './components/home/TestimoniosCarousel';
import Link from 'next/link';

export const metadata = {
  title: 'MINAFAM - Ministero Nacional de matrimonios y familias',
};

export default function InicioPage() {
  const eventosProximos = [...eventos].sort(
    (a, b) => new Date(`${a.fecha}T12:00:00`) - new Date(`${b.fecha}T12:00:00`)
  );

  return (
    <>
      <Hero />
      <StatsBar />
      <EventosPreview eventos={eventosProximos} />
      <MinisteriosPreview ministerios={ministerios} />


      
    </>
  );
}
