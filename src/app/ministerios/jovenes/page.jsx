import ministerios from '../../../../data/ministerios.json';
import { notFound } from 'next/navigation';
import JovenesDetalle from '../../components/ministerios/jovenes/JovenesDetalle';

const ministerio = ministerios.find((m) => m.id === 'jovenes');

export const metadata = {
  title: `${ministerio?.nombre || 'Ministerio'} - MINAFAM`,
};

export default function JovenesPage() {
  if (!ministerio) notFound();

  const relacionados = ministerios.filter((m) => m.id !== 'jovenes').slice(0, 3);

  return <JovenesDetalle ministerio={ministerio} relacionados={relacionados} />;
}