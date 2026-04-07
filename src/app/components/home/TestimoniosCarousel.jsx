'use client';
import { useState, useEffect } from 'react';

export default function TestimoniosCarousel({ testimonios }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonios.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonios.length]);

  const prev = () => setCurrent((c) => (c - 1 + testimonios.length) % testimonios.length);
  const next = () => setCurrent((c) => (c + 1) % testimonios.length);

  const t = testimonios[current];

  return (
    <section className="section section-testimonios">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Testimonios</span>
          <h2 className="section-title">Lo que dicen nuestros miembros</h2>
        </div>
        <div className="testimonios-carousel">
          <div className="testimonio-slide">
            <div className="testimonio-card active">
              <div className="testimonio-quote">
                <i className="fas fa-quote-left"></i>
              </div>
              <p className="testimonio-text">{t.testimonio}</p>
              <div className="testimonio-author">
                <img
                  src={`https://placehold.co/60x60/c0392b/ffffff?text=${t.nombre.charAt(0)}`}
                  alt={t.nombre}
                />
                <div>
                  <strong>{t.nombre}</strong>
                  <span>{t.iglesia}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="carousel-controls">
            <button className="carousel-btn" onClick={prev} aria-label="Anterior">
              <i className="fas fa-chevron-left"></i>
            </button>
            <div className="carousel-dots">
              {testimonios.map((_, i) => (
                <button
                  key={i}
                  className={`dot${i === current ? ' active' : ''}`}
                  onClick={() => setCurrent(i)}
                  aria-label={`Ir al testimonio ${i + 1}`}
                />
              ))}
            </div>
            <button className="carousel-btn" onClick={next} aria-label="Siguiente">
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
