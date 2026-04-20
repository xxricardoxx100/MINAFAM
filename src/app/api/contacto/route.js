import { NextResponse } from 'next/server';

const ASUNTO_LABELS = {
  info: 'Informacion general',
  ministerios: 'Ministerios',
  eventos: 'Eventos',
  oracion: 'Peticion de oracion',
  otro: 'Otro',
};

function sanitizeText(value) {
  return String(value || '').trim();
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
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

  const nombre = sanitizeText(body?.nombre);
  const email = sanitizeText(body?.email);
  const telefono = sanitizeText(body?.telefono);
  const asunto = sanitizeText(body?.asunto);
  const mensaje = sanitizeText(body?.mensaje);

  if (nombre.length < 2) {
    return NextResponse.json(
      { error: 'Nombre inválido.' },
      { status: 400 }
    );
  }

  if (!isValidEmail(email)) {
    return NextResponse.json(
      { error: 'Correo electrónico inválido.' },
      { status: 400 }
    );
  }

  if (!asunto) {
    return NextResponse.json(
      { error: 'Selecciona un asunto.' },
      { status: 400 }
    );
  }

  if (!mensaje) {
    return NextResponse.json(
      { error: 'Escribe un mensaje.' },
      { status: 400 }
    );
  }

  const curso = ASUNTO_LABELS[asunto] || asunto;

  const payload = {
    fecha: new Date().toISOString(),
    nombre,
    telefono,
    curso,
    mensaje: `Correo: ${email}. ${mensaje}`,
    seccionPrincipal: 'llamadas directas',
    ministerio: '',
    seccionesDestino: ['llamadas directas'],
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
      message: 'Mensaje enviado correctamente.',
    });
  } catch {
    return NextResponse.json(
      { error: 'No fue posible conectar con Google Sheets.' },
      { status: 502 }
    );
  }
}
