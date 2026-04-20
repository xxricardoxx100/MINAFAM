import ministerios from '../../data/ministerios.json';
import eventos from '../../data/eventos.json';
import testimonios from '../../data/testimonios.json';
import Hero from './components/home/Hero';
import StatsBar from './components/home/StatsBar';
import EventosPreview from './components/home/EventosPreview';
import MinisteriosPreview from './components/home/MinisteriosPreview';
import TestimoniosCarousel from './components/home/TestimoniosCarousel';
import Link from 'next/link';
import { expandEventosPorFechas } from '../utils/eventos';

export const metadata = {
  title: 'MINAFAM - Ministero Nacional de matrimonios y familias',
};

export default function InicioPage() {
  const eventosProximos = expandEventosPorFechas(eventos);

  return (
    <>
      <Hero />
      <StatsBar />
      <EventosPreview eventos={eventosProximos} />
      <MinisteriosPreview ministerios={ministerios} />


      
    </>
  );
}
