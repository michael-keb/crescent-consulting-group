#!/usr/bin/env node
/**
 * Sends a test enquiry email to raja@crescentconsulting.com.au via FormSubmit.
 * Usage:
 *   node scripts/send-enquiry-email.mjs
 *   node scripts/send-enquiry-email.mjs --name "Jane Doe" --email "jane@example.com" --message "Hello"
 */

const RECIPIENT = 'raja@crescentconsulting.com.au';
const FORMSUBMIT_URL = `https://formsubmit.co/ajax/${encodeURIComponent(RECIPIENT)}`;

function readArg(flag, fallback = '') {
  const index = process.argv.indexOf(flag);
  return index >= 0 ? process.argv[index + 1] ?? fallback : fallback;
}

const payload = {
  reference: readArg('--reference', 'TEST1234'),
  kind: readArg('--kind', 'enquiry'),
  name: readArg('--name', 'Website test'),
  email: readArg('--email', 'website-test@example.com'),
  organisation: readArg('--organisation', ''),
  message: readArg('--message', 'Test message from scripts/send-enquiry-email.mjs'),
  availability: readArg('--availability', ''),
};

const siteOrigin = readArg('--origin', 'https://crescentconsulting.com.au');
const kindLabel = payload.kind === 'call' ? 'Call request' : 'Enquiry';

const response = await fetch(FORMSUBMIT_URL, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Referer: `${siteOrigin.replace(/\/$/, '')}/conversation`,
    'User-Agent': 'CrescentConsultingGroup/1.0',
  },
  body: JSON.stringify({
    _subject: `CCG ${kindLabel} — ${payload.reference}`,
    _template: 'table',
    _captcha: 'false',
    _replyto: payload.email,
    reference: payload.reference,
    request_type: kindLabel,
    name: payload.name,
    email: payload.email,
    organisation: payload.organisation || '—',
    message: payload.message,
    availability: payload.availability || '—',
  }),
});

const body = await response.json();
console.log(JSON.stringify({ status: response.status, body }, null, 2));
process.exit(body.success === true || body.success === 'true' ? 0 : 1);
