'use client';
import {ArrowUpRight} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {Accordion,AccordionItem,AccordionTrigger,AccordionContent} from '@/components/ui/accordion';
import {faqs} from './data';

export default function Resources(){return <main id="main"><section className="page-hero wrap"><h1>FAQs</h1></section><section className="faq-section wrap" id="faqs"><Accordion type="single" collapsible>{faqs.map(([q,a],i)=><AccordionItem value={String(i)} key={q}><AccordionTrigger>{q}</AccordionTrigger><AccordionContent>{a}</AccordionContent></AccordionItem>)}</Accordion></section><section className="conversation-banner wrap" style={{marginTop:45}}><p className="eyebrow">STILL NOT SURE?</p><h2>A question is enough<br/><em>to begin.</em></h2><p>You don’t need to choose the right service before getting in touch.</p><Button asChild className="primary-button"><a href="/conversation">Start a conversation <ArrowUpRight/></a></Button></section></main>}
