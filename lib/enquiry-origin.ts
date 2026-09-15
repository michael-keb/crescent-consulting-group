const TRUSTED_SITE_ORIGINS = new Set([
  'https://crescentconsulting.com.au',
  'https://www.crescentconsulting.com.au',
  'https://crescent-consulting-group.onrender.com',
  'http://localhost:5173',
  'http://127.0.0.1:5173',
]);

export function isAllowedEnquiryOrigin(origin: string | null, requestUrl: string) {
  if (!origin) return true;
  if (TRUSTED_SITE_ORIGINS.has(origin)) return true;
  return origin === new URL(requestUrl).origin;
}

export function siteOriginForEmail(request: Request) {
  const origin = request.headers.get('origin');
  if (origin && TRUSTED_SITE_ORIGINS.has(origin)) return origin;
  return new URL(request.url).origin;
}
