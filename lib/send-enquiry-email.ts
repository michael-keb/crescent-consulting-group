export type EnquiryEmailPayload = {
  reference: string;
  kind: 'enquiry' | 'call';
  name: string;
  email: string;
  organisation: string;
  message: string;
  availability: string;
};

const RECIPIENT = 'raja@crescentconsulting.com.au';
const FORMSUBMIT_URL = `https://formsubmit.co/ajax/${encodeURIComponent(RECIPIENT)}`;

function kindLabel(kind: EnquiryEmailPayload['kind']) {
  return kind === 'call' ? 'Call request' : 'Enquiry';
}

export async function sendEnquiryEmail(payload: EnquiryEmailPayload, siteOrigin: string) {
  const response = await fetch(FORMSUBMIT_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Referer: `${siteOrigin.replace(/\/$/, '')}/conversation`,
      'User-Agent': 'CrescentConsultingGroup/1.0',
    },
    body: JSON.stringify({
      _subject: `CCG ${kindLabel(payload.kind)} — ${payload.reference}`,
      _template: 'table',
      _captcha: 'false',
      _replyto: payload.email,
      reference: payload.reference,
      request_type: kindLabel(payload.kind),
      name: payload.name,
      email: payload.email,
      organisation: payload.organisation || '—',
      message: payload.message,
      availability: payload.availability || '—',
    }),
  });

  let body: { success?: boolean | string; message?: string } = {};
  try {
    body = (await response.json()) as typeof body;
  } catch {
    throw new Error('We could not deliver your message by email. Please try again or call 0436 279 219.');
  }

  const ok = body.success === true || body.success === 'true';
  if (!response.ok || !ok) {
    const message = body.message?.trim();
    if (message?.toLowerCase().includes('activation')) {
      throw new Error('The contact form is being activated. Please try again shortly, or call 0436 279 219.');
    }
    throw new Error(message || 'We could not deliver your message by email. Please try again or call 0436 279 219.');
  }
}
