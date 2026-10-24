// The contact form handler (docs/services.md §1). Receives a plain form post
// from /contact, checks it, and emails it to the organization. Nothing is
// stored. Kept free of Cloudflare-only imports so it can be tested in Node.

export const TOPICS = ['Lessons', 'Joining the band', 'Giving', 'Something else'];

// Cloudflare's published Turnstile test secret: every check passes. Used on
// beta and local builds until a real widget exists.
export const TURNSTILE_TEST_SECRET = '1x0000000000000000000000000000000AA';

const LIMITS = { name: 100, email: 200, phone: 40, message: 5000 };
const MAX_BODY_BYTES = 20_000;

/**
 * Checks the submitted fields. Returns { ok: true, data } or
 * { ok: false, problem } with a short reason for the logs.
 */
export function validate(form) {
  const get = (key) => String(form.get(key) ?? '').trim();
  // A field people never see: bots fill it in.
  if (get('website')) return { ok: false, problem: 'honeypot' };

  const data = {
    name: get('name'),
    email: get('email'),
    phone: get('phone'),
    texting: get('texting'),
    topic: get('topic'),
    message: get('message'),
  };
  if (!data.name || !data.email || !data.topic || !data.message) {
    return { ok: false, problem: 'missing required field' };
  }
  for (const [key, max] of Object.entries(LIMITS)) {
    if (data[key].length > max) return { ok: false, problem: `${key} too long` };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    return { ok: false, problem: 'invalid email' };
  }
  if (!TOPICS.includes(data.topic)) return { ok: false, problem: 'unknown topic' };
  if (data.texting && !['yes', 'no'].includes(data.texting)) {
    return { ok: false, problem: 'invalid texting answer' };
  }
  // Header injection: no line breaks in anything that goes into a header.
  if (/[\r\n]/.test(data.name + data.email)) return { ok: false, problem: 'line break in header' };
  return { ok: true, data };
}

/** Asks Cloudflare whether the Turnstile token is from a real visitor. */
export async function verifyTurnstile(token, secret, ip, fetchImpl = fetch) {
  if (!token) return false;
  const body = new FormData();
  body.append('secret', secret);
  body.append('response', token);
  if (ip) body.append('remoteip', ip);
  // If the check can't be reached, treat the message as unverified (the
  // visitor sees the not-sent page with our email and phone).
  try {
    const response = await fetchImpl('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body,
    });
    if (!response.ok) return false;
    const result = await response.json();
    return result.success === true;
  } catch {
    return false;
  }
}

/** UTF-8 text as base64, the same way in Workers and Node. */
function base64(text) {
  let binary = '';
  for (const byte of new TextEncoder().encode(text)) binary += String.fromCharCode(byte);
  return btoa(binary);
}

/** RFC 2047 encoded-word for header text that may not be plain ASCII. */
function headerText(text) {
  return /^[\x20-\x7e]*$/.test(text) ? text : `=?UTF-8?B?${base64(text)}?=`;
}

/** The email as raw MIME text: plain text, replies go to the sender. */
export function buildEmail({ data, from, to, date = new Date(), id = crypto.randomUUID() }) {
  const lines = [
    `New message from the website contact form.`,
    ``,
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone || '(not given)'}`,
    `May we text: ${data.phone ? data.texting || '(not answered)' : '(no phone)'}`,
    `About: ${data.topic}`,
    ``,
    data.message,
    ``,
    `--`,
    `Reply to this email to answer ${data.name}.`,
  ];
  const domain = from.split('@')[1];
  const headers = [
    `From: "FAASL website" <${from}>`,
    `To: <${to}>`,
    `Reply-To: ${headerText(data.name)} <${data.email}>`,
    `Subject: ${headerText(`Website message: ${data.topic} (${data.name})`)}`,
    `Date: ${date.toUTCString()}`,
    `Message-ID: <${id}@${domain}>`,
    `MIME-Version: 1.0`,
    `Content-Type: text/plain; charset=UTF-8`,
    `Content-Transfer-Encoding: base64`,
  ];
  const body = base64(lines.join('\r\n')).replace(/.{76}/g, '$&\r\n');
  return `${headers.join('\r\n')}\r\n\r\n${body}\r\n`;
}

/**
 * Handles POST /api/contact. Always answers with a redirect to a page that
 * explains the outcome, so it works as a plain HTML form.
 *   deps.send(from, to, raw): sends the email (Cloudflare's binding)
 *   deps.fetch: for the Turnstile check (tests replace it)
 */
export async function handleContact(request, env, deps = {}) {
  const origin = new URL(request.url).origin;
  const redirect = (path) => Response.redirect(`${origin}${path}`, 303);
  const fail = (problem) => {
    console.log(`contact form: not sent (${problem})`);
    return redirect('/message-not-sent');
  };

  if (Number(request.headers.get('content-length') ?? 0) > MAX_BODY_BYTES) {
    return fail('too large');
  }
  let form;
  try {
    form = await request.formData();
  } catch {
    return fail('not a form');
  }

  const checked = validate(form);
  if (!checked.ok) return fail(checked.problem);

  const secret =
    env.TURNSTILE_SECRET ?? (env.TURNSTILE_TEST_MODE === 'true' ? TURNSTILE_TEST_SECRET : null);
  if (!secret) return fail('Turnstile secret not configured');
  const human = await verifyTurnstile(
    String(form.get('cf-turnstile-response') ?? ''),
    secret,
    request.headers.get('cf-connecting-ip'),
    deps.fetch,
  );
  if (!human) return fail('Turnstile check failed');

  // Until launch (faasl.org's DNS on Cloudflare), the form works end to end
  // but logs instead of emailing.
  if (env.EMAIL_ENABLED !== 'true' || !deps.send) {
    console.log(`contact form: checks passed; email not enabled (topic: ${checked.data.topic})`);
    return redirect('/message-sent');
  }

  try {
    const raw = buildEmail({ data: checked.data, from: env.CONTACT_FROM, to: env.CONTACT_TO });
    await deps.send(env.CONTACT_FROM, env.CONTACT_TO, raw);
  } catch (error) {
    return fail(`email failed: ${error instanceof Error ? error.message : error}`);
  }
  return redirect('/message-sent');
}
