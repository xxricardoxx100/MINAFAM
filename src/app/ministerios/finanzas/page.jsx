import ministerios from '../../../../data/ministerios.json';
import { notFound } from 'next/navigation';
import FinanzasDetalle from '../../components/ministerios/finanzas/FinanzasDetalle';

const ministerio = ministerios.find((m) => m.id === 'finanzas');

export const metadata = {
  title: `${ministerio?.nombre || 'Ministerio'} - MINAFAM`,
};

export default function FinanzasPage() {
  if (!ministerio) notFound();

  const relacionados = ministerios.filter((m) => m.id !== 'finanzas').slice(0, 3);

  return <FinanzasDetalle ministerio={ministerio} relacionados={relacionados} />;
}