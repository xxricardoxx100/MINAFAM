import ministerios from '../../../../data/ministerios.json';
import { notFound } from 'next/navigation';
import NoviosDetalle from '../../components/ministerios/novios/NoviosDetalle';

const ministerio = ministerios.find((m) => m.id === 'novios');

export const metadata = {
  title: `${ministerio?.nombre || 'Ministerio'} - MINAFAM`,
};

export default function NoviosPage() {
  if (!ministerio) notFound();

  const relacionados = ministerios.filter((m) => m.id !== 'novios').slice(0, 3);

  return <NoviosDetalle ministerio={ministerio} relacionados={relacionados} />;
}