import { NextResponse } from 'next/server';
import eventos from '../../../../../data/eventos.json';

function normalizeMinisterio(value) {
  return String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .toLowerCase();
}

function resolveMinisterioSection(ministerio) {
  const normalized = normalizeMinisterio(ministerio);

  if (normalized.includes('matrimonios')) return 'matrimonios';
  if (normalized.includes('novios')) return 'novios';
  if (normalized.includes('finanzas')) return 'finanzas';
  if (normalized.includes('jovenes')) return 'Jovenes';

  return 'llamadas directas';
}

function sanitizeName(value) {
  return String(value || '').trim();
}

function sanitizePhone(value) {
  return String(value || '').trim();
}

function sanitizeMessage(value) {
  return String(value || '').trim();
}

export async function POST(request) {
  let body;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: 'No se pudo leer la solicitud.' },
      { status: 400 }
    );
  }

  const nombre = sanitizeName(body?.nombre);
  const telefono = sanitizePhone(body?.telefono);
  const mensaje = sanitizeMessage(body?.mensaje);
  const cursoId = String(body?.cursoId || '').trim();

  if (nombre.length < 2) {
    return NextResponse.json(
      { error: 'Nombre inválido.' },
      { status: 400 }
    );
  }

  const digitos = telefono.replace(/\D/g, '');
  if (digitos.length < 7) {
    return NextResponse.json(
      { error: 'Número de teléfono inválido.' },
      { status: 400 }
    );
  }

  if (!cursoId) {
    return NextResponse.json(
      { error: 'Selecciona un curso.' },
      { status: 400 }
    );
  }

  const curso = eventos.find((evento) => evento.id === cursoId);
  if (!curso) {
    return NextResponse.json(
      { error: 'Curso no válido.' },
      { status: 400 }
    );
  }

  const ministerio = String(curso.ministerio || '').trim();
  const seccionMinisterio = resolveMinisterioSection(ministerio);

  const payload = {
    fecha: new Date().toISOString(),
    nombre,
    telefono,
    curso: curso.nombre,
    mensaje: mensaje || 'Inscripción por formulario',
    seccionPrincipal: 'formularios cursos',
    ministerio,
    seccionesDestino: [seccionMinisterio],
  };

  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  if (!webhookUrl) {
    return NextResponse.json(
      {
        error:
          'Falta configurar GOOGLE_SHEETS_WEBHOOK_URL para enviar datos a Google Sheets.',
      },
      { status: 500 }
    );
  }

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      cache: 'no-store',
    });

    const responseText = await response.text();

    if (!response.ok) {
      return NextResponse.json(
        {
          error: 'Google Sheets rechazó la solicitud.',
          detail: responseText.slice(0, 400),
        },
        { status: 502 }
      );
    }

    return NextResponse.json({
      ok: true,
      message: 'Inscripción enviada correctamente.',
    });
  } catch {
    return NextResponse.json(
      { error: 'No fue posible conectar con Google Sheets.' },
      { status: 502 }
    );
  }
}
