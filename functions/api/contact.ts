interface Env {
  RESEND_API_KEY: string;
}

const ALLOWED_ORIGIN = 'https://kecker.co';
const TO_EMAIL = 'frontdoor@kecker.co';
const FROM_EMAIL = 'contact@kecker.co';

function cors(origin: string | null) {
  const allowed = origin === ALLOWED_ORIGIN || origin?.endsWith('.kecker-docs.pages.dev');
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

  // Honeypot — bots fill this invisible field
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

  const apiKey = env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('RESEND_API_KEY not configured');
    return json({ error: 'Mail service unavailable. Please email frontdoor@kecker.co directly.' }, 503, origin);
  }

  const interestLabel = interest || 'General inquiry';
  const companyLine = company ? `<tr><td style="padding:4px 0;color:#666">Company</td><td style="padding:4px 0 4px 16px">${esc(company)}</td></tr>` : '';

  const html = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><title>New contact from kecker.co</title></head>
<body style="margin:0;padding:0;background:#faf9f7;font-family:system-ui,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#faf9f7;padding:40px 20px">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border:1px solid #e0dbd5;border-radius:8px;overflow:hidden">
        <tr>
          <td style="background:#971b2f;padding:20px 32px">
            <p style="margin:0;color:#fff;font-size:18px;letter-spacing:-0.3px">New message via kecker.co</p>
          </td>
        </tr>
        <tr>
          <td style="padding:32px">
            <table cellpadding="0" cellspacing="0" style="font-size:15px;color:#2a2a2a;width:100%">
              <tr><td style="padding:4px 0;color:#666">Name</td><td style="padding:4px 0 4px 16px"><strong>${esc(name)}</strong></td></tr>
              <tr><td style="padding:4px 0;color:#666">Email</td><td style="padding:4px 0 4px 16px"><a href="mailto:${esc(email)}" style="color:#971b2f">${esc(email)}</a></td></tr>
              ${companyLine}
              <tr><td style="padding:4px 0;color:#666">Interest</td><td style="padding:4px 0 4px 16px">${esc(interestLabel)}</td></tr>
            </table>
            <hr style="border:none;border-top:1px solid #e0dbd5;margin:24px 0">
            <p style="font-size:15px;line-height:1.7;color:#2a2a2a;white-space:pre-wrap">${esc(message)}</p>
          </td>
        </tr>
        <tr>
          <td style="padding:16px 32px;background:#faf9f7;border-top:1px solid #e0dbd5">
            <p style="margin:0;font-size:12px;color:#999">Reply directly to this email to respond to ${esc(name)}.</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: `Kecker Contact <${FROM_EMAIL}>`,
      to: [TO_EMAIL],
      reply_to: email,
      subject: `[kecker.co] ${interestLabel} — ${name}`,
      html,
    }),
  });

  if (!res.ok) {
    const detail = await res.text();
    console.error('Resend error', res.status, detail);
    return json({ error: 'Could not send your message. Please try again or email us directly.' }, 502, origin);
  }

  return json({ ok: true }, 200, origin);
};

function esc(s: string) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
