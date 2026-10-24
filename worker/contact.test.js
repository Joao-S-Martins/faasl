// Tests for the contact form handler: node --test worker/
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildEmail, handleContact, validate } from './contact.js';

const good = {
  name: 'Ana Silva',
  email: 'ana@example.com',
  phone: '510-555-0100',
  texting: 'yes',
  topic: 'Lessons',
  message: 'Can my daughter (age 9) start this Friday?',
  'cf-turnstile-response': 'token',
};

function post(fields, headers = {}) {
  const body = new FormData();
  for (const [key, value] of Object.entries(fields)) body.append(key, value);
  return new Request('https://faasl-beta.example/api/contact', { method: 'POST', body, headers });
}

const passing = async () => new Response(JSON.stringify({ success: true }));
const failing = async () => new Response(JSON.stringify({ success: false }));
const env = {
  TURNSTILE_TEST_MODE: 'true',
  EMAIL_ENABLED: 'true',
  CONTACT_FROM: 'website@forms.faasl.org',
  CONTACT_TO: 'info@faasl.org',
};

test('valid message is emailed and the visitor sees the thank-you page', async () => {
  const sent = [];
  const res = await handleContact(post(good), env, {
    fetch: passing,
    send: async (...args) => sent.push(args),
  });
  assert.equal(res.status, 303);
  assert.equal(res.headers.get('location'), 'https://faasl-beta.example/message-sent');
  assert.equal(sent.length, 1);
  const [from, to, raw] = sent[0];
  assert.equal(from, 'website@forms.faasl.org');
  assert.equal(to, 'info@faasl.org');
  assert.match(raw, /^Reply-To: Ana Silva <ana@example\.com>$/m);
  assert.match(raw, /^Subject: Website message: Lessons \(Ana Silva\)$/m);
});

test('the email body carries every field', () => {
  const checked = validate(new Map(Object.entries(good)));
  const raw = buildEmail({ data: checked.data, from: 'a@forms.faasl.org', to: 'info@faasl.org' });
  const body = raw.split('\r\n\r\n')[1].replace(/\r\n/g, '');
  const text = new TextDecoder().decode(Uint8Array.from(atob(body), (c) => c.charCodeAt(0)));
  for (const value of ['Ana Silva', 'ana@example.com', '510-555-0100', 'yes', 'Lessons', 'age 9']) {
    assert.ok(text.includes(value), `missing ${value}`);
  }
});

test('non-ASCII names are encoded in headers', () => {
  const checked = validate(new Map(Object.entries({ ...good, name: 'João Martins' })));
  const raw = buildEmail({ data: checked.data, from: 'a@forms.faasl.org', to: 'info@faasl.org' });
  assert.match(raw, /^Reply-To: =\?UTF-8\?B\?[A-Za-z0-9+/=]+\?= <ana@example\.com>$/m);
});

test('without the email switch on, checks run but nothing is sent', async () => {
  const sent = [];
  const res = await handleContact(
    post(good),
    { ...env, EMAIL_ENABLED: 'false' },
    {
      fetch: passing,
      send: async (...args) => sent.push(args),
    },
  );
  assert.equal(res.headers.get('location'), 'https://faasl-beta.example/message-sent');
  assert.equal(sent.length, 0);
});

for (const [why, fields] of [
  ['honeypot filled', { ...good, website: 'http://spam.example' }],
  ['missing message', { ...good, message: '' }],
  ['bad email', { ...good, email: 'not-an-email' }],
  ['unknown topic', { ...good, topic: 'Buy now' }],
  ['line break in name', { ...good, name: 'Ana\r\nBcc: x@example.com' }],
  ['message too long', { ...good, message: 'x'.repeat(5001) }],
]) {
  test(`rejected: ${why}`, async () => {
    const sent = [];
    const res = await handleContact(post(fields), env, {
      fetch: passing,
      send: async (...args) => sent.push(args),
    });
    assert.equal(res.headers.get('location'), 'https://faasl-beta.example/message-not-sent');
    assert.equal(sent.length, 0);
  });
}

test('rejected: Turnstile says it is a bot', async () => {
  const sent = [];
  const res = await handleContact(post(good), env, {
    fetch: failing,
    send: async (...args) => sent.push(args),
  });
  assert.equal(res.headers.get('location'), 'https://faasl-beta.example/message-not-sent');
  assert.equal(sent.length, 0);
});

test('rejected: no Turnstile secret configured', async () => {
  const res = await handleContact(
    post(good),
    { ...env, TURNSTILE_TEST_MODE: 'false' },
    {
      fetch: passing,
    },
  );
  assert.equal(res.headers.get('location'), 'https://faasl-beta.example/message-not-sent');
});

test('an email failure sends the visitor to the not-sent page', async () => {
  const res = await handleContact(post(good), env, {
    fetch: passing,
    send: async () => {
      throw new Error('destination not verified');
    },
  });
  assert.equal(res.headers.get('location'), 'https://faasl-beta.example/message-not-sent');
});

test('rejected, not crashed: the Turnstile check cannot be reached', async () => {
  const res = await handleContact(post(good), env, {
    fetch: async () => {
      throw new TypeError('network down');
    },
  });
  assert.equal(res.headers.get('location'), 'https://faasl-beta.example/message-not-sent');
});
