import iglesias from '../../../data/iglesias.json';
import Link from 'next/link';

export const metadata = {
  title: 'Iglesias - MINAFAM',
};

export default function IglesiasPage() {
  const iglesiasActivas = iglesias.filter((iglesia) => iglesia.activa !== false);

  const ordenDepartamentos = ['Lima', 'Huancayo', 'Junin'];
  const etiquetaDepartamento = {
    Lima: 'Prersbiterio Lima Este',
  };

  const iglesiasPorDepartamento = ordenDepartamentos
    .map((departamento) => ({
      departamento,
      iglesias: iglesiasActivas
        .filter((iglesia) => iglesia.departamento === departamento)
        .sort((a, b) => a.nombre.localeCompare(b.nombre, 'es')),
    }))
    .filter((grupo) => grupo.iglesias.length > 0);

  return (
    <>
      {/* Page Header */}
      <section className="page-header">
        <div className="page-header-overlay"></div>
        <div className="container">
          <h1>Nuestras Iglesias</h1>
          <p>Encuentra la iglesia más cercana a ti y únete a nuestra comunidad.</p>
          <nav className="breadcrumb" aria-label="breadcrumb">
            <Link href="/">Inicio</Link>
            <span>/</span>
            <span>Iglesias</span>
          </nav>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="iglesias-departamentos">
            {iglesiasPorDepartamento.map((grupo) => (
              <section className="departamento-section" key={grupo.departamento}>
                <div className="departamento-header">
                  <h2>{etiquetaDepartamento[grupo.departamento] ?? grupo.departamento}</h2>
                  <span>{grupo.iglesias.length} iglesia(s)</span>
                </div>

                <div className="iglesias-grid-full">
                  {grupo.iglesias.map((iglesia) => (
                    <article className="iglesia-card-full" key={iglesia.id}>
                      <div className="iglesia-imagen">
                        <img
                          src={
                            iglesia.imagen ||
                            `https://placehold.co/500x320/2c3e50/ffffff?text=${encodeURIComponent(iglesia.nombre)}`
                          }
                          alt={iglesia.nombre}
                        />
                      </div>
                      <div className="iglesia-info">
                        <h3>{iglesia.nombre}</h3>
                        <p className="iglesia-lider">
                          <i className="fas fa-user-tie"></i> {iglesia.pastor}
                        </p>
                        <p className="iglesia-desc">{iglesia.descripcion}</p>

                        <div className="iglesia-details">
                          <p><i className="fas fa-map-marker-alt"></i> {iglesia.direccion}</p>
                          <p><i className="fas fa-clock"></i> {iglesia.servicios}</p>
                          <p><i className="fas fa-phone"></i> {iglesia.telefono}</p>
                          <p><i className="fas fa-users"></i> {iglesia.miembros} miembros</p>
                        </div>

                        <div className="iglesia-footer">
                          <Link href={`/iglesias/${iglesia.id}`} className="btn btn-primary btn-sm">
                            Ver iglesia
                          </Link>
                          <a href={`mailto:${iglesia.email}`} className="btn btn-outline btn-sm">
                            Contactar
                          </a>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
