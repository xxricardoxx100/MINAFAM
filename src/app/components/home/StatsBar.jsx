'use client';

import { useEffect, useRef, useState } from 'react';

const STATS = [
  { value: 15, label: 'Años de ministerio' },
  { value: 6, label: 'Iglesias asociadas' },
  { value: 5000, label: 'Familias impactadas' },
  { value: 4, label: 'Ministerios activos' },
];

export default function StatsBar() {
  const [counts, setCounts] = useState(STATS.map(() => 0));
  const [hasStarted, setHasStarted] = useState(false);
  const statsRef = useRef(null);

  useEffect(() => {
    const section = statsRef.current;
    if (!section) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasStarted) return undefined;

    const duration = 1800;
    const startTime = performance.now();
    let rafId;

    const tick = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      setCounts(STATS.map((stat) => Math.floor(stat.value * progress)));

      if (progress < 1) {
        rafId = window.requestAnimationFrame(tick);
      }
    };

    rafId = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(rafId);
  }, [hasStarted]);

  return (
    <section className="stats-bar" ref={statsRef}>
      <div className="stats-container">
        {STATS.map((stat, index) => (
          <div className="stat-item" key={stat.label}>
            <span className="stat-number">{counts[index].toLocaleString()}+</span>
            <p className="stat-label">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
