import { enquiryDb } from '@/db/enquiries';
import { z } from 'zod';
const schema=z.object({id:z.string().uuid(),name:z.string().trim().min(1).max(120),email:z.string().trim().email().max(254),organisation:z.string().trim().max(160),kind:z.enum(['enquiry','call']),message:z.string().trim().min(1).max(4000),availability:z.string().trim().max(300),website:z.string().max(0)});
export async function POST(request:Request){
 const origin=request.headers.get('origin');if(origin && origin!==new URL(request.url).origin)return Response.json({error:'Please send your request from this website.'},{status:403});
 if(Number(request.headers.get('content-length')||0)>20000)return Response.json({error:'Please keep your message under 4,000 characters.'},{status:413});
 try{const value=schema.safeParse(await request.json());if(!value.success)return Response.json({error:'Please check your name, email and message, then try again.'},{status:400});const d=value.data;
 await enquiryDb().prepare('INSERT INTO enquiries (id,name,email,organisation,kind,message,availability,created_at,status) VALUES (?,?,?,?,?,?,?,?,?) ON CONFLICT(id) DO NOTHING').bind(d.id,d.name,d.email,d.organisation,d.kind,d.message,d.availability,Date.now(),'new').run();
 return Response.json({ok:true,reference:d.id.slice(0,8).toUpperCase(),kind:d.kind});
 }catch(error){console.error('Unable to save enquiry',error instanceof Error?error.message:'Unknown error');return Response.json({error:'Your message hasn’t been saved. Please keep this page open and try again in a moment.'},{status:503});}
}
