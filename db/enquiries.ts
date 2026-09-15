import { env } from 'cloudflare:workers';
export function enquiryDb(){if(!env.DB)throw new Error('Enquiry storage is unavailable');return env.DB;}
