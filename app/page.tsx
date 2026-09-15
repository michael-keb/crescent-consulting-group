import { ArrowUpRight, Users, Sprout, MessagesSquare, Handshake } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { resources } from './resources/data';
const needs = [
  {icon: Users, title:'Diverse workplace support', text:'A sounding board for your people and HR questions.', href:'/how-we-help#hr'},
  {icon: Sprout, title:'Practical inclusion at work', text:'Everyday changes that help people feel they belong.', href:'/how-we-help#workplaces'},
  {icon: MessagesSquare, title:'Cultural misunderstandings', text:'A thoughtful way through difficult conversations.', href:'/how-we-help#understanding'},
  {icon: Handshake, title:'Respectful engagement', text:'Build stronger connections with diverse communities.', href:'/how-we-help#engagement'},
];

export default function Home() {
  return (
    <main id="main" className="home-page">
      <section className="hero wrap">
        <div className="hero-copy">
          <p className="eyebrow">UNDERSTANDING PEOPLE. CONNECTING COMMUNITIES AND WORKPLACES.</p>
          <h1>Understanding people.<br/><em>Thriving workplaces.</em></h1>
          <p className="home-reassurance">You don’t need all the answers,<br/><strong>just where to start.</strong></p>
          <p className="hero-description">We help Australian workplaces understand cultural needs and work better together.</p>
          <Button asChild className="primary-button"><a href="/conversation">Let’s start a conversation <ArrowUpRight/></a></Button>
        </div>
        <div className="hero-visual">
          <div className="photo-frame" id="hero-photo"><img src="/australian-workplace-five.png" alt="Five colleagues working together around a shared table in a warm Australian workplace" width={1774} height={887} fetchPriority="high"/></div>
          <a className="explore-panel" href="/how-we-help"><div><strong>Explore how we can help</strong><span>Practical support for your workplace.</span></div><ArrowUpRight size={26}/></a>
        </div>
      </section>

      <section className="audience-strip" aria-labelledby="audience-title"><div className="wrap">
        <p id="audience-title" className="eyebrow">FOR THE PEOPLE WHO BRING PEOPLE TOGETHER</p>
        <ul className="audience-list"><li>Employers and HR teams</li><li>Schools and Educators</li><li>Community and Cultural Teams</li></ul>
      </div></section>

      <section className="section wrap" id="help">
        <div className="section-heading"><div><p className="eyebrow">A LITTLE CLARITY GOES A LONG WAY</p><h2>A question.<em> A way forward.</em></h2></div><p>Quick questions or complex situations — find a thoughtful place to begin.</p></div>
        <div className="needs-grid">{needs.map(n=><a className="need-card" href={n.href} key={n.title}><n.icon size={25} strokeWidth={1.35}/><h3>{n.title}</h3><p>{n.text}</p><span className="card-link">Find out more <ArrowUpRight size={18}/></span></a>)}</div>
      </section>

      <section className="approach"><div className="wrap approach-grid">
        <div><p className="eyebrow">HUMAN FIRST. PRACTICAL ALWAYS.</p><h2>More understanding.<br/><em>Less second-guessing.</em></h2><p>Workplaces work better when people understand each other. We bring cultural perspectives without preaching, and practical conversations that help make that possible.</p><a className="text-link" href="/about">Get to know us <ArrowUpRight size={18}/></a></div>
        <ol className="steps">{[['We listen first','Tell us what’s on your mind, in your own words.'],['We explore it together','Understand the context and the people involved.'],['We find a practical next step','Guidance, another conversation or an appropriate introduction.']].map(([title,text],i)=><li className="step" key={title}><span aria-hidden="true">0{i+1}</span><div><h3>{title}</h3><p>{text}</p></div></li>)}</ol>
      </div></section>

      <section className="section wrap home-resources">
        <div className="section-heading"><div><p className="eyebrow">A USEFUL PLACE TO BEGIN</p><h2>Small reads.<em> Fresh perspectives.</em></h2></div><a className="text-link" href="/resources">View FAQs <ArrowUpRight size={18}/></a></div>
        <div className="home-resource-list">{resources.map(r=><a className={'home-resource '+r.color} href={'/resources/'+r.slug} key={r.slug}><p className="eyebrow">{r.type}</p><h3>{r.title}<ArrowUpRight size={20}/></h3><p>{r.description}</p></a>)}</div>
      </section>

      <section className="conversation-banner wrap">
        <div><p className="eyebrow">NO PERFECT QUESTION NEEDED</p><h2>Let’s work it out.<em> Together.</em></h2><p>A sentence or two is enough to begin.</p></div>
        <Button asChild className="primary-button"><a href="/conversation">Let’s start a conversation <ArrowUpRight/></a></Button>
      </section>
    </main>
  );
}
