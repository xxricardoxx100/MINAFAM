import ministerios from '../../../../data/ministerios.json';
import { notFound } from 'next/navigation';
import MatrimoniosYFamiliasDetalle from '../../components/ministerios/matrimoniosyfamilias/MatrimoniosYFamiliasDetalle';

const ministerio = ministerios.find((m) => m.id === 'matrimoniosyfamilias');

export const metadata = {
  title: `${ministerio?.nombre || 'Ministerio'} - MINAFAM`,
};

export default function MatrimoniosYFamiliasPage() {
  if (!ministerio) notFound();

  const relacionados = ministerios.filter((m) => m.id !== 'matrimoniosyfamilias').slice(0, 3);

  return <MatrimoniosYFamiliasDetalle ministerio={ministerio} relacionados={relacionados} />;
}