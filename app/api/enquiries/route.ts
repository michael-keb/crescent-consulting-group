import { enquiryDb } from '@/db/enquiries';
import { isAllowedEnquiryOrigin, siteOriginForEmail } from '@/lib/enquiry-origin';
import { sendEnquiryEmail } from '@/lib/send-enquiry-email';
import { z } from 'zod';

const schema = z.object({
  id: z.string().uuid(),
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(254),
  organisation: z.string().trim().max(160),
  kind: z.enum(['enquiry', 'call']),
  message: z.string().trim().min(1).max(4000),
  availability: z.string().trim().max(300),
  website: z.string().max(0),
});

async function saveEnquiry(data: z.infer<typeof schema>) {
  await enquiryDb()
    .prepare(
      'INSERT INTO enquiries (id,name,email,organisation,kind,message,availability,created_at,status) VALUES (?,?,?,?,?,?,?,?,?) ON CONFLICT(id) DO NOTHING',
    )
    .bind(data.id, data.name, data.email, data.organisation, data.kind, data.message, data.availability, Date.now(), 'new')
    .run();
}

export async function POST(request: Request) {
  const origin = request.headers.get('origin');
  if (!isAllowedEnquiryOrigin(origin, request.url)) {
    return Response.json({ error: 'Please send your request from this website.' }, { status: 403 });
  }
  if (Number(request.headers.get('content-length') || 0) > 20000) {
    return Response.json({ error: 'Please keep your message under 4,000 characters.' }, { status: 413 });
  }

  try {
    const value = schema.safeParse(await request.json());
    if (!value.success) {
      return Response.json({ error: 'Please check your name, email and message, then try again.' }, { status: 400 });
    }

    const data = value.data;
    const reference = data.id.slice(0, 8).toUpperCase();

    await sendEnquiryEmail(
      {
        reference,
        kind: data.kind,
        name: data.name,
        email: data.email,
        organisation: data.organisation,
        message: data.message,
        availability: data.availability,
      },
      siteOriginForEmail(request),
    );

    try {
      await saveEnquiry(data);
    } catch (error) {
      console.error('Enquiry saved by email but database write failed', error instanceof Error ? error.message : 'Unknown error');
    }

    return Response.json({ ok: true, reference, kind: data.kind });
  } catch (error) {
    console.error('Unable to send enquiry', error instanceof Error ? error.message : 'Unknown error');
    const message =
      error instanceof Error
        ? error.message
        : 'Your message has not been sent. Please keep this page open and try again in a moment.';
    return Response.json({ error: message }, { status: 503 });
  }
}
