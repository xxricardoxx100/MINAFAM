'use client';
import { Suspense, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import eventos from '../../../data/eventos.json';

function normalizeText(value) {
  return String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .toLowerCase();
}

function ContactoPageContent() {
  const searchParams = useSearchParams();
  const whatsappGroupLink = (process.env.NEXT_PUBLIC_WHATSAPP_GROUP_LINK || '').trim();

  const esFormularioCursos =
    searchParams.get('tipo') === 'inscripcion' &&
    searchParams.get('preferencia') === 'formulario';

  const cursosDisponibles = useMemo(
    () =>
      eventos
        .filter((evento) => normalizeText(evento.ministerio) !== 'general')
        .map((evento) => ({
          id: evento.id,
          nombre: evento.nombre,
          ministerio: evento.ministerio,
        })),
    []
  );

  const cursoIdSugerido = useMemo(() => {
    const cursoId = searchParams.get('cursoId');
    if (cursoId && cursosDisponibles.some((curso) => curso.id === cursoId)) {
      return cursoId;
    }

    const cursoPorNombre = searchParams.get('evento');
    if (!cursoPorNombre) return '';

    const curso = cursosDisponibles.find(
      (item) => normalizeText(item.nombre) === normalizeText(cursoPorNombre)
    );

    return curso?.id || '';
  }, [searchParams, cursosDisponibles]);

  const noHayCursos = esFormularioCursos && cursosDisponibles.length === 0;

  const [form, setForm] = useState({
    nombre: '',
    email: '',
    telefono: '',
    asunto: '',
    cursoId: '',
    mensaje: '',
  });
  const [enviado, setEnviado] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [errorEnvio, setErrorEnvio] = useState('');

  useEffect(() => {
    if (!esFormularioCursos || !cursoIdSugerido) return;

    setForm((prev) => {
      if (prev.cursoId) return prev;

      return {
        ...prev,
        cursoId: cursoIdSugerido,
      };
    });
  }, [esFormularioCursos, cursoIdSugerido]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errorEnvio) setErrorEnvio('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrorEnvio('');

    if (!esFormularioCursos) {
      setEnviando(true);

      try {
        const response = await fetch('/api/contacto', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            nombre: form.nombre.trim(),
            email: form.email.trim(),
            telefono: form.telefono.trim(),
            asunto: form.asunto,
            mensaje: form.mensaje.trim(),
          }),
        });

        const data = await response.json().catch(() => ({}));

        if (!response.ok) {
          throw new Error(data?.error || 'No se pudo enviar tu mensaje.');
        }

        setEnviado(true);
      } catch (error) {
        setErrorEnvio(error?.message || 'No se pudo enviar tu mensaje.');
      } finally {
        setEnviando(false);
      }

      return;
    }

    if (noHayCursos) {
      setErrorEnvio('No hay cursos disponibles en este momento.');
      return;
    }

    if (!form.cursoId) {
      setErrorEnvio('Selecciona un curso.');
      return;
    }

    setEnviando(true);

    try {
      const response = await fetch('/api/inscripciones/formulario', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre: form.nombre.trim(),
          telefono: form.telefono.trim(),
          cursoId: form.cursoId,
          mensaje: form.mensaje.trim(),
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data?.error || 'No se pudo enviar tu inscripción.');
      }

      setEnviado(true);
    } catch (error) {
      setErrorEnvio(error?.message || 'No se pudo enviar tu inscripción.');
    } finally {
      setEnviando(false);
    }
  };

  return (
    <>
      <section className="page-header">
        <div className="page-header-overlay"></div>
        <div className="container">
          <h1>Contáctanos</h1>
          <p>Estamos aquí para ayudarte. No dudes en escribirnos.</p>
          <nav className="breadcrumb" aria-label="breadcrumb">
            <Link href="/">Inicio</Link>
            <span>/</span>
            <span>Contacto</span>
          </nav>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="contacto-layout">
            {/* Formulario */}
            <div className="contacto-form-wrap">
              <h2>{esFormularioCursos ? 'Formulario de inscripción' : 'Envíanos un mensaje'}</h2>
              {enviado ? (
                <div className="form-success show">
                  <i className="fas fa-check-circle"></i>
                  <h3>{esFormularioCursos ? '¡Inscripción enviada!' : '¡Mensaje enviado!'}</h3>
                  <p>{esFormularioCursos ? 'Nos pondremos en contacto contigo pronto. También puedes unirte al grupo.' : 'Nos pondremos en contacto contigo pronto.'}</p>
                  {esFormularioCursos && whatsappGroupLink && (
                    <div className="whatsapp-join-highlight">
                      <p className="whatsapp-join-title">
                        <i className="fab fa-whatsapp" aria-hidden="true"></i>
                        Únete ahora al grupo de WhatsApp
                      </p>
                      <p className="whatsapp-join-text">
                        Ahí compartimos recordatorios, enlaces y avisos importantes del curso.
                      </p>
                    </div>
                  )}
                  {esFormularioCursos ? (
                    <div className="form-success-actions">
                      {whatsappGroupLink && (
                        <a
                          href={whatsappGroupLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn whatsapp-join-btn"
                        >
                          <i className="fab fa-whatsapp" aria-hidden="true"></i>
                          Unirme al grupo de WhatsApp
                        </a>
                      )}
                      <Link href="/eventos" className="btn btn-outline">Volver a Eventos</Link>
                    </div>
                  ) : (
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        setEnviado(false);
                        setForm({
                          nombre: '',
                          email: '',
                          telefono: '',
                          asunto: '',
                          cursoId: '',
                          mensaje: '',
                        });
                      }}
                    >
                      Enviar otro
                    </button>
                  )}
                </div>
              ) : (
                <form className="contacto-form" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="nombre">Nombre completo</label>
                    <input
                      id="nombre" name="nombre" type="text"
                      placeholder="Tu nombre" required
                      value={form.nombre} onChange={handleChange}
                    />
                  </div>
                  {esFormularioCursos ? (
                    <>
                      <div className="form-group">
                        <label htmlFor="telefono">Teléfono</label>
                        <input
                          id="telefono" name="telefono" type="tel"
                          placeholder="+51 999 999 999" required
                          value={form.telefono} onChange={handleChange}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="cursoId">Cursos</label>
                        <select
                          id="cursoId"
                          name="cursoId"
                          required
                          disabled={noHayCursos}
                          value={form.cursoId}
                          onChange={handleChange}
                        >
                          <option value="">{noHayCursos ? 'No hay cursos disponibles' : 'Selecciona un curso'}</option>
                          {cursosDisponibles.map((curso) => (
                            <option key={curso.id} value={curso.id}>
                              {curso.nombre}
                            </option>
                          ))}
                        </select>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="form-row">
                        <div className="form-group">
                          <label htmlFor="email">Correo electrónico</label>
                          <input
                            id="email" name="email" type="email"
                            placeholder="tu@email.com" required
                            value={form.email} onChange={handleChange}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="telefono">Teléfono (opcional)</label>
                          <input
                            id="telefono" name="telefono" type="tel"
                            placeholder="+1 (555) 000-0000"
                            value={form.telefono} onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <label htmlFor="asunto">Asunto</label>
                        <select id="asunto" name="asunto" required value={form.asunto} onChange={handleChange}>
                          <option value="">Selecciona un asunto</option>
                          <option value="info">Información general</option>
                          <option value="ministerios">Ministerios</option>
                          <option value="eventos">Eventos</option>
                          <option value="oracion">Petición de oración</option>
                          <option value="otro">Otro</option>
                        </select>
                      </div>
                    </>
                  )}
                  <div className="form-group">
                    <label htmlFor="mensaje">{esFormularioCursos ? 'Mensaje (opcional)' : 'Mensaje'}</label>
                    <textarea
                      id="mensaje" name="mensaje" rows="5"
                      placeholder="Escribe tu mensaje aquí..."
                      value={form.mensaje} onChange={handleChange}
                      required={!esFormularioCursos}
                    />
                  </div>
                  {errorEnvio && <p className="form-error">{errorEnvio}</p>}
                  <button type="submit" className="btn btn-primary btn-block" disabled={enviando || noHayCursos}>
                    <i className="fas fa-paper-plane"></i> {enviando ? 'Enviando...' : (esFormularioCursos ? 'Enviar inscripción' : 'Enviar mensaje')}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function ContactoPageFallback() {
  return (
    <>
      <section className="page-header">
        <div className="page-header-overlay"></div>
        <div className="container">
          <h1>Contáctanos</h1>
          <p>Estamos aquí para ayudarte. No dudes en escribirnos.</p>
          <nav className="breadcrumb" aria-label="breadcrumb">
            <Link href="/">Inicio</Link>
            <span>/</span>
            <span>Contacto</span>
          </nav>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="contacto-layout">
            <div className="contacto-form-wrap">
              <h2>Cargando formulario...</h2>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default function ContactoPage() {
  return (
    <Suspense fallback={<ContactoPageFallback />}>
      <ContactoPageContent />
    </Suspense>
  );
}
