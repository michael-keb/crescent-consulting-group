export const WEB3FORMS_URL = 'https://api.web3forms.com/submit';

/** Public access key — safe to use in client-side code (Web3Forms). */
export const WEB3FORMS_ACCESS_KEY = '9357096f-810b-427f-9559-7ff309ecdfea';

export function enquiryKindLabel(kind: 'enquiry' | 'call') {
  return kind === 'call' ? 'Call request' : 'Enquiry';
}

export function enquiryReference(id: string) {
  return id.slice(0, 8).toUpperCase();
}
