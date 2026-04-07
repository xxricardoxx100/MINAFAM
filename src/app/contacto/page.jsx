'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function ContactoPage() {
  const [form, setForm] = useState({ nombre: '', email: '', telefono: '', asunto: '', mensaje: '' });
  const [enviado, setEnviado] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setEnviado(true);
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
              <h2>Envíanos un mensaje</h2>
              {enviado ? (
                <div className="form-success">
                  <i className="fas fa-check-circle"></i>
                  <h3>¡Mensaje enviado!</h3>
                  <p>Nos pondremos en contacto contigo pronto.</p>
                  <button className="btn btn-primary" onClick={() => setEnviado(false)}>
                    Enviar otro
                  </button>
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
                  <div className="form-group">
                    <label htmlFor="mensaje">Mensaje</label>
                    <textarea
                      id="mensaje" name="mensaje" rows="5"
                      placeholder="Escribe tu mensaje aquí..." required
                      value={form.mensaje} onChange={handleChange}
                    />
                  </div>
                  <button type="submit" className="btn btn-primary btn-block">
                    <i className="fas fa-paper-plane"></i> Enviar mensaje
                  </button>
                </form>
              )}
            </div>

            {/* Info */}
            <div className="contacto-info">
              <h2>Información de contacto</h2>
              <ul className="contacto-info-list">
                <li>
                  <i className="fas fa-map-marker-alt"></i>
                  <div>
                    <strong>Dirección</strong>
                    <span>Av. Principal 123, Ciudad</span>
                  </div>
                </li>
                <li>
                  <i className="fas fa-phone"></i>
                  <div>
                    <strong>Teléfono</strong>
                    <span>+1 (555) 000-0000</span>
                  </div>
                </li>
                <li>
                  <i className="fas fa-envelope"></i>
                  <div>
                    <strong>Email</strong>
                    <span>info@minafam.org</span>
                  </div>
                </li>
                <li>
                  <i className="fas fa-clock"></i>
                  <div>
                    <strong>Horario de oficina</strong>
                    <span>Lun–Vie 9:00 AM – 5:00 PM</span>
                  </div>
                </li>
              </ul>

              <div className="contacto-social">
                <h3>Redes sociales</h3>
                <div className="social-links">
                  <a href="#" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
                  <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
                  <a href="#" aria-label="YouTube"><i className="fab fa-youtube"></i></a>
                  <a href="#" aria-label="WhatsApp"><i className="fab fa-whatsapp"></i></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
