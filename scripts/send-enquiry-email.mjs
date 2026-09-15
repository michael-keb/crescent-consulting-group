#!/usr/bin/env node
/**
 * Sends a test enquiry email via Web3Forms.
 * Usage:
 *   node scripts/send-enquiry-email.mjs
 *   node scripts/send-enquiry-email.mjs --name "Jane Doe" --email "jane@example.com" --message "Hello"
 */

const WEB3FORMS_URL = 'https://api.web3forms.com/submit';
const WEB3FORMS_ACCESS_KEY = '9357096f-810b-427f-9559-7ff309ecdfea';

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

const kindLabel = payload.kind === 'call' ? 'Call request' : 'Enquiry';

const response = await fetch(WEB3FORMS_URL, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  body: JSON.stringify({
    access_key: WEB3FORMS_ACCESS_KEY,
    subject: `CCG ${kindLabel} — ${payload.reference}`,
    from_name: payload.name,
    email: payload.email,
    replyto: payload.email,
    name: payload.name,
    request_type: kindLabel,
    reference: payload.reference,
    organisation: payload.organisation || '—',
    message: payload.message,
    availability: payload.availability || '—',
  }),
});

const body = await response.json();
console.log(JSON.stringify({ status: response.status, body }, null, 2));
process.exit(body.success === true ? 0 : 1);
