import { WEB3FORMS_ACCESS_KEY, WEB3FORMS_URL, enquiryKindLabel } from '@/lib/enquiry-config';

export type EnquiryEmailPayload = {
  reference: string;
  kind: 'enquiry' | 'call';
  name: string;
  email: string;
  organisation: string;
  message: string;
  availability: string;
};

/** Server-side send via Web3Forms (used by scripts and optional API paths). */
export async function sendEnquiryEmail(payload: EnquiryEmailPayload, _siteOrigin: string) {
  const response = await fetch(WEB3FORMS_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      access_key: WEB3FORMS_ACCESS_KEY,
      subject: `CCG ${enquiryKindLabel(payload.kind)} — ${payload.reference}`,
      from_name: payload.name,
      email: payload.email,
      replyto: payload.email,
      name: payload.name,
      request_type: enquiryKindLabel(payload.kind),
      reference: payload.reference,
      organisation: payload.organisation || '—',
      message: payload.message,
      availability: payload.availability || '—',
    }),
  });

  let body: { success?: boolean; message?: string } = {};
  try {
    body = (await response.json()) as typeof body;
  } catch {
    throw new Error('We could not deliver your message by email. Please try again or call 0436 279 219.');
  }

  if (!response.ok || !body.success) {
    throw new Error(body.message || 'We could not deliver your message by email. Please try again or call 0436 279 219.');
  }
}
