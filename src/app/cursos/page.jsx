import eventos from '../../../data/eventos.json';
import CursosCatalogo from '../components/eventos/CursosCatalogo';

export const metadata = {
  title: 'Cursos - MINAFAM',
};

export default function CursosPage() {
  return (
    <>
      <section className="page-header">
        <div className="page-header-overlay"></div>
        <div className="container">
          <h1>Cursos</h1>
          <p>Inscríbete en nuestros cursos y fortalece tu vida espiritual, familiar y personal.</p>
        </div>
      </section>

      <CursosCatalogo eventos={eventos} />
    </>
  );
}