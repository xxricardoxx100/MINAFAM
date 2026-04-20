'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';

export default function RegistroInscripcionPopup({ evento, onClose }) {
  const abierta = Boolean(evento);
  const [modoLlamada, setModoLlamada] = useState(false);
  const [solicitudEnviada, setSolicitudEnviada] = useState(false);
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [enviando, setEnviando] = useState(false);
  const [feedback, setFeedback] = useState({ tipo: 'idle', mensaje: '' });

  useEffect(() => {
    if (!abierta) return undefined;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [abierta, onClose]);

  useEffect(() => {
    if (!abierta) return;

    setModoLlamada(false);
    setSolicitudEnviada(false);
    setNombre('');
    setTelefono('');
    setEnviando(false);
    setFeedback({ tipo: 'idle', mensaje: '' });
  }, [abierta, evento]);

  const formularioHref = useMemo(() => {
    if (!evento) {
      return '/contacto';
    }

    const formularioParams = new URLSearchParams({
      tipo: 'inscripcion',
      preferencia: 'formulario',
      cursoId: evento.id,
      evento: evento.nombre,
    });

    return `/contacto?${formularioParams.toString()}`;
  }, [evento]);

  const enviarSolicitudLlamada = async (event) => {
    event.preventDefault();

    const nombreNormalizado = nombre.trim();
    const telefonoNormalizado = telefono.trim();
    const digitos = telefonoNormalizado.replace(/\D/g, '');

    if (nombreNormalizado.length < 2) {
      setFeedback({ tipo: 'error', mensaje: 'Ingresa tu nombre.' });
      return;
    }

    if (digitos.length < 7) {
      setFeedback({ tipo: 'error', mensaje: 'Ingresa un número de teléfono válido.' });
      return;
    }

    setEnviando(true);
    setFeedback({ tipo: 'idle', mensaje: '' });

    try {
      const response = await fetch('/api/inscripciones/llamada', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre: nombreNormalizado,
          telefono: telefonoNormalizado,
          eventoNombre: evento?.nombre || '',
          ministerio: evento?.ministerio || '',
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data?.error || 'No pudimos enviar tu solicitud.');
      }

      setNombre('');
      setTelefono('');
      setFeedback({ tipo: 'idle', mensaje: '' });
      setSolicitudEnviada(true);
    } catch (error) {
      setFeedback({
        tipo: 'error',
        mensaje: error?.message || 'No pudimos registrar tu número. Intenta de nuevo.',
      });
    } finally {
      setEnviando(false);
    }
  };

  if (!abierta) return null;

  return (
    <div
      className="registro-popup-backdrop"
      role="presentation"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="registro-popup" role="dialog" aria-modal="true" aria-labelledby="registro-popup-title">
        <button
          type="button"
          className="registro-popup-close"
          onClick={onClose}
          aria-label="Cerrar ventana de inscripción"
        >
          <i className="fas fa-times"></i>
        </button>

        {modoLlamada && solicitudEnviada ? (
          <div className="registro-llamada-exito" role="status" aria-live="polite">
            <p>Listo. Te llamaremos pronto.</p>
          </div>
        ) : (
          <>
            <p className="registro-popup-tag">Inscripción</p>
            <h3 id="registro-popup-title">{modoLlamada ? 'Déjanos tu nombre y número' : '¿Cómo quieres inscribirte?'}</h3>
            <p className="registro-popup-evento">Evento: <strong>{evento.nombre}</strong></p>

            {modoLlamada ? (
              <form className="registro-llamada-form" onSubmit={enviarSolicitudLlamada}>
                <label className="registro-llamada-label" htmlFor="registro-nombre">
                  Nombre
                </label>
                <input
                  id="registro-nombre"
                  name="nombre"
                  type="text"
                  className="registro-llamada-input"
                  placeholder="Tu nombre"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                  autoFocus
                />

                <label className="registro-llamada-label" htmlFor="registro-telefono">
                  Número de teléfono
                </label>
                <input
                  id="registro-telefono"
                  name="telefono"
                  type="tel"
                  inputMode="tel"
                  className="registro-llamada-input"
                  placeholder="Ejemplo: 999 999 999"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                  required
                />

                <button type="submit" className="btn btn-primary registro-llamada-submit" disabled={enviando}>
                  {enviando ? 'Enviando...' : 'Enviar'}
                </button>

                {feedback.tipo === 'error' && (
                  <p className="registro-llamada-feedback error">{feedback.mensaje}</p>
                )}
              </form>
            ) : (
              <div className="registro-popup-options">
                <button
                  type="button"
                  className="registro-popup-option registro-popup-option-call"
                  onClick={() => {
                    setModoLlamada(true);
                    setSolicitudEnviada(false);
                    setFeedback({ tipo: 'idle', mensaje: '' });
                  }}
                >
                  <i className="fas fa-phone"></i>
                  <span>Quiero que me llamen para inscribirme</span>
                </button>

                <Link
                  href={formularioHref}
                  className="registro-popup-option registro-popup-option-form"
                  onClick={onClose}
                >
                  <i className="fas fa-file-signature"></i>
                  <span>Quiero rellenar un formulario para inscribirme</span>
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}