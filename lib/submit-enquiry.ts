import {
  WEB3FORMS_ACCESS_KEY,
  WEB3FORMS_URL,
  enquiryKindLabel,
  enquiryReference,
} from '@/lib/enquiry-config';

export type EnquiryFormData = {
  id: string;
  kind: 'enquiry' | 'call';
  name: string;
  email: string;
  organisation: string;
  message: string;
  availability: string;
};

export async function submitEnquiryViaWeb3Forms(data: EnquiryFormData) {
  const reference = enquiryReference(data.id);

  const response = await fetch(WEB3FORMS_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      access_key: WEB3FORMS_ACCESS_KEY,
      subject: `CCG ${enquiryKindLabel(data.kind)} — ${reference}`,
      from_name: data.name,
      email: data.email,
      replyto: data.email,
      name: data.name,
      request_type: enquiryKindLabel(data.kind),
      reference,
      organisation: data.organisation || '—',
      message: data.message,
      availability: data.availability || '—',
    }),
  });

  let body: { success?: boolean; message?: string } = {};
  try {
    body = (await response.json()) as typeof body;
  } catch {
    throw new Error('Your message hasn’t been sent. Please try again or call 0436 279 219.');
  }

  if (!response.ok || !body.success) {
    throw new Error(body.message || 'Your message hasn’t been sent. Please try again or call 0436 279 219.');
  }

  return { reference, kind: data.kind };
}
