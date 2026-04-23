interface Env {
  DB: D1Database;
}

const ALLOWED_ORIGIN = 'https://kecker.co';

function cors(origin: string | null) {
  const allowed = origin === ALLOWED_ORIGIN || (origin?.endsWith('.kecker-docs.pages.dev') ?? false);
  return {
    'Access-Control-Allow-Origin': allowed ? (origin ?? ALLOWED_ORIGIN) : ALLOWED_ORIGIN,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}

function json(body: unknown, status = 200, origin: string | null = null) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', ...cors(origin) },
  });
}

export const onRequestOptions: PagesFunction = ({ request }) =>
  new Response(null, { status: 204, headers: cors(request.headers.get('origin')) });

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const origin = request.headers.get('origin');

  let body: Record<string, string>;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'Invalid request body.' }, 400, origin);
  }

  // Honeypot — bots fill this invisible field, humans never see it
  if (body.website) return json({ ok: true }, 200, origin);

  const { name, email, company, interest, message } = body;

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return json({ error: 'Name, email, and message are required.' }, 422, origin);
  }

  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRe.test(email)) {
    return json({ error: 'Please enter a valid email address.' }, 422, origin);
  }

  if (message.trim().length < 10) {
    return json({ error: 'Message is too short.' }, 422, origin);
  }

  const ip =
    request.headers.get('cf-connecting-ip') ??
    request.headers.get('x-forwarded-for')?.split(',')[0].trim() ??
    null;

  try {
    await env.DB.prepare(
      `INSERT INTO contact_submissions (name, email, company, interest, message, ip)
       VALUES (?, ?, ?, ?, ?, ?)`
    )
      .bind(
        name.trim(),
        email.trim().toLowerCase(),
        company?.trim() || null,
        interest?.trim() || null,
        message.trim(),
        ip
      )
      .run();
  } catch (err) {
    console.error('D1 insert failed:', err);
    return json({ error: 'Could not save your message. Please try again.' }, 500, origin);
  }

  return json({ ok: true }, 200, origin);
};
