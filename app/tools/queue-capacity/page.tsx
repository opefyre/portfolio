import type { Metadata } from 'next';
import type { Note } from '@/lib/notes';
import { site } from '@/content/site';
import heroes from '@/content/tool-heroes.json';
import { NoteHero } from '@/components/notes/NoteHero';
import { QueueCapacity } from '@/components/tools/QueueCapacity';

const title = 'Queue and Capacity Playground';
const seoTitle = 'Queue and capacity: free 3D waiting-time simulator';
const description = 'See why queues form even with spare capacity. Compare even and grouped arrivals in a free 3D tool. Change job numbers and work times.';
const hero = heroes['queue-capacity'];
const url = '/tools/queue-capacity/';
export const metadata: Metadata = {
  title: seoTitle, description,
  alternates: { canonical: url },
  openGraph: { title: seoTitle, description, url, type: 'website', images: [{ url: hero.src, width: hero.width, height: hero.height, alt: hero.alt }] },
  twitter: { card: 'summary_large_image', title: seoTitle, description, images: [{url:hero.src,alt:hero.alt}] },
};
const guide: Note = {
  slug:'queue-capacity', title, seoTitle, seoDescription:description,
  date:'2026-11-25', updated:'2026-11-25', status:'published', topic:'Operational excellence',
  summary:'See how arrival timing changes waiting, even when the work fits into the hour.',
  html:'', readingMinutes:1, words:160, keywords:['queue simulator','capacity and waiting time','queueing simulation'], toc:[], videos:[],
};
export default function QueueCapacityPage() {
  const structured = {'@context':'https://schema.org','@type':'WebApplication',name:title,description,url:site.url+url,image:site.url+hero.src,applicationCategory:'EducationalApplication',operatingSystem:'Any',author:{'@type':'Person',name:site.name,url:site.url+'/about/'}};
  return <div className="paper" data-nav-tone="light"><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(structured).replace(/</g,'\\u003c')}}/><QueueCapacity hero={<NoteHero note={guide} image={hero}/>}/></div>;
}
