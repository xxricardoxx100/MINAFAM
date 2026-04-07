import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="section" style={{ textAlign: 'center', padding: '6rem 1rem' }}>
      <div className="container">
        <h1 style={{ fontSize: '6rem', color: 'var(--red)', marginBottom: '1rem' }}>404</h1>
        <h2>Página no encontrada</h2>
        <p>Lo sentimos, la página que buscas no existe o fue movida.</p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2rem' }}>
          <Link href="/" className="btn btn-primary">Ir al inicio</Link>
          <Link href="/iglesias" className="btn btn-outline">Ver iglesias</Link>
        </div>
      </div>
    </section>
  );
}
