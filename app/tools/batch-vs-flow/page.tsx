import type { Metadata } from 'next';
import type { Note } from '@/lib/notes';
import { site } from '@/content/site';
import heroes from '@/content/tool-heroes.json';
import { NoteHero } from '@/components/notes/NoteHero';
import { BatchFlow } from '@/components/tools/BatchFlow';

const title = 'Batch vs one-piece flow';
const seoTitle = 'Batch vs one-piece flow: free interactive tool';
const description = 'Compare batch transfer and one-piece flow in a free 3D tool. Change group sizes and step times to see how waiting affects order completion.';
const hero = heroes['batch-vs-flow'];
const url = '/tools/batch-vs-flow/';
export const metadata: Metadata = {
  title: seoTitle, description,
  alternates: { canonical: url },
  openGraph: { title: seoTitle, description, url, type: 'website', images: [{ url: hero.src, width: hero.width, height: hero.height, alt: hero.alt }] },
  twitter: { card: 'summary_large_image', title: seoTitle, description, images: [{url:hero.src,alt:hero.alt}] },
};
const guide: Note = {
  slug:'batch-vs-flow', title, seoTitle, seoDescription:description,
  date:'2026-11-25', updated:'2026-11-25', status:'published', topic:'Operational excellence',
  summary:'Compare moving ten pieces together with passing smaller groups to the next step.',
  html:'', readingMinutes:1, words:160, keywords:['batch vs one-piece flow','transfer batch size','one-piece flow simulator'], toc:[], videos:[],
};
export default function BatchFlowPage() {
  const structured = {'@context':'https://schema.org','@type':'WebApplication',name:title,description,url:site.url+url,image:site.url+hero.src,applicationCategory:'EducationalApplication',operatingSystem:'Any',author:{'@type':'Person',name:site.name,url:site.url+'/about/'}};
  return <div className="paper" data-nav-tone="light"><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(structured).replace(/</g,'\\u003c')}}/><BatchFlow hero={<NoteHero note={guide} image={hero}/>}/></div>;
}
