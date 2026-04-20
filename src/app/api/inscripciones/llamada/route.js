import { NextResponse } from 'next/server';

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

function sanitizePhone(value) {
  return String(value || '').trim();
}

function sanitizeName(value) {
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

  const telefono = sanitizePhone(body?.telefono);
  const nombre = sanitizeName(body?.nombre);
  const digitos = telefono.replace(/\D/g, '');

  if (nombre.length < 2) {
    return NextResponse.json(
      { error: 'Nombre inválido.' },
      { status: 400 }
    );
  }

  if (digitos.length < 7) {
    return NextResponse.json(
      { error: 'Número de teléfono inválido.' },
      { status: 400 }
    );
  }

  const ministerio = String(body?.ministerio || '').trim();
  const seccionMinisterio = resolveMinisterioSection(ministerio);

  const payload = {
    fecha: new Date().toISOString(),
    nombre,
    telefono,
    curso: String(body?.eventoNombre || '').trim(),
    mensaje: 'Solicitud de llamada directa',
    seccionPrincipal: 'llamadas directas',
    ministerio,
    seccionesDestino: ['llamadas directas', seccionMinisterio],
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
      message: 'Solicitud registrada correctamente.',
    });
  } catch {
    return NextResponse.json(
      { error: 'No fue posible conectar con Google Sheets.' },
      { status: 502 }
    );
  }
}
