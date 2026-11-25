import type { Metadata } from 'next';
import type { Note } from '@/lib/notes';
import { site } from '@/content/site';
import heroes from '@/content/tool-heroes.json';
import { NoteHero } from '@/components/notes/NoteHero';
import { BottleneckFinder } from '@/components/tools/BottleneckFinder';

const title = 'Bottleneck Finder';
const seoTitle = 'Bottleneck Finder: free 3D production line simulator';
const description = 'Choose a step to speed up in a free 3D production line. Compare waiting pieces, finished output and completion time to find the bottleneck.';
const hero = heroes['bottleneck-finder'];
const url = '/tools/bottleneck-finder/';
export const metadata: Metadata = {
  title: seoTitle, description,
  alternates: { canonical: url },
  openGraph: { title: seoTitle, description, url, type: 'website', images: [{ url: hero.src, width: hero.width, height: hero.height, alt: hero.alt }] },
  twitter: { card: 'summary_large_image', title: seoTitle, description, images: [{url:hero.src,alt:hero.alt}] },
};
const guide: Note = {
  slug:'bottleneck-finder', title, seoTitle, seoDescription:description,
  date:'2026-11-25', updated:'2026-11-25', status:'published', topic:'Operational excellence',
  summary:'Speed up one step and see how much sooner the whole order finishes.',
  html:'', readingMinutes:1, words:160, keywords:['bottleneck simulator','production bottleneck','theory of constraints tool'], toc:[], videos:[],
};
export default function BottleneckFinderPage() {
  const structured = {'@context':'https://schema.org','@type':'WebApplication',name:title,description,url:site.url+url,image:site.url+hero.src,applicationCategory:'EducationalApplication',operatingSystem:'Any',author:{'@type':'Person',name:site.name,url:site.url+'/about/'}};
  return <div className="paper" data-nav-tone="light"><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(structured).replace(/</g,'\\u003c')}}/><BottleneckFinder hero={<NoteHero note={guide} image={hero}/>}/></div>;
}
