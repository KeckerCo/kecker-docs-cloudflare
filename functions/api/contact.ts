import { EmailMessage } from 'cloudflare:email';

interface Env {
  DB: D1Database;
  SEND_EMAIL: SendEmail;
}

const ALLOWED_ORIGIN = 'https://kecker.co';
const FROM_EMAIL = 'contact@kecker.co';
const TO_EMAIL   = 'frontdoor@kecker.co';

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

/** Build a minimal RFC-2822 / MIME message without any npm dependencies */
function buildMime(
  fromName: string,
  from: string,
  to: string,
  replyTo: string,
  subject: string,
  html: string,
): string {
  const boundary = `----=_Part_${Date.now().toString(36)}`;
  const date = new Date().toUTCString();
  const encodedSubject = `=?UTF-8?B?${btoa(unescape(encodeURIComponent(subject)))}?=`;
  const htmlB64 = btoa(unescape(encodeURIComponent(html)));

  return [
    `Date: ${date}`,
    `From: ${fromName} <${from}>`,
    `To: ${to}`,
    `Reply-To: ${replyTo}`,
    `Subject: ${encodedSubject}`,
    `MIME-Version: 1.0`,
    `Content-Type: multipart/alternative; boundary="${boundary}"`,
    ``,
    `--${boundary}`,
    `Content-Type: text/html; charset=UTF-8`,
    `Content-Transfer-Encoding: base64`,
    ``,
    // Split base64 into 76-char lines (RFC 2045)
    htmlB64.match(/.{1,76}/g)?.join('\r\n') ?? htmlB64,
    ``,
    `--${boundary}--`,
  ].join('\r\n');
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

  // 1. Persist to D1
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

  // 2. Send notification email via Cloudflare Email Routing (non-fatal if unavailable)
  if (env.SEND_EMAIL) {
    try {
      const interestLine = interest?.trim()
        ? `<tr><td style="padding:6px 0;color:#666;font-size:14px;width:110px">About</td><td style="padding:6px 0;font-size:14px">${esc(interest)}</td></tr>`
        : '';
      const companyLine = company?.trim()
        ? `<tr><td style="padding:6px 0;color:#666;font-size:14px">Company</td><td style="padding:6px 0;font-size:14px">${esc(company)}</td></tr>`
        : '';

      const html = `<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#faf9f7;font-family:system-ui,sans-serif">
<table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 20px">
  <tr><td align="center">
    <table width="580" cellpadding="0" cellspacing="0" style="background:#fff;border:1px solid #e0dbd5;border-radius:8px;overflow:hidden">
      <tr><td style="background:#971b2f;padding:18px 28px">
        <p style="margin:0;color:#fff;font-size:17px;letter-spacing:-0.2px">New message — kecker.co</p>
      </td></tr>
      <tr><td style="padding:28px">
        <table cellpadding="0" cellspacing="0" style="width:100%;margin-bottom:20px">
          <tr><td style="padding:6px 0;color:#666;font-size:14px;width:110px">From</td><td style="padding:6px 0;font-size:14px"><strong>${esc(name)}</strong> &lt;<a href="mailto:${esc(email)}" style="color:#971b2f">${esc(email)}</a>&gt;</td></tr>
          ${companyLine}${interestLine}
        </table>
        <hr style="border:none;border-top:1px solid #e0dbd5;margin:0 0 20px">
        <p style="font-size:15px;line-height:1.75;color:#2a2a2a;white-space:pre-wrap;margin:0">${esc(message)}</p>
      </td></tr>
      <tr><td style="padding:14px 28px;background:#faf9f7;border-top:1px solid #e0dbd5">
        <p style="margin:0;font-size:12px;color:#999">Reply to this email to respond directly to ${esc(name)}.</p>
      </td></tr>
    </table>
  </td></tr>
</table>
</body></html>`;

      const rawMime = buildMime(
        'Kecker Contact',
        FROM_EMAIL,
        TO_EMAIL,
        email.trim(),
        `[kecker.co] ${interest?.trim() || 'New message'} — ${name.trim()}`,
        html,
      );

      const emailMsg = new EmailMessage(FROM_EMAIL, TO_EMAIL, rawMime);
      await env.SEND_EMAIL.send(emailMsg);
    } catch (err) {
      // Log but don't fail — data is already saved in D1
      console.error('Email send failed:', err);
    }
  }

  return json({ ok: true }, 200, origin);
};

function esc(s: string) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
