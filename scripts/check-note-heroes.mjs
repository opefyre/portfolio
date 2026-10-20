/** Guard complete, topic-specific hero assets and their exported SEO connections. */
import {readFileSync,readdirSync,statSync} from 'node:fs';
import path from 'node:path';
import {createHash} from 'node:crypto';
import sharp from 'sharp';
const root=process.cwd(),out=path.resolve(process.argv[2]||'out');
const heroes=JSON.parse(readFileSync('content/note-heroes.json','utf8'));
const slugs=readdirSync('content/notes').filter(f=>f.endsWith('.md')).map(f=>f.slice(0,-3));
const errors=[],hashes=new Set();
const sitemap=readFileSync(path.join(out,'sitemap.xml'),'utf8');
if(Object.keys(heroes).length!==slugs.length)errors.push('Hero inventory does not match the Notes inventory');
for(const slug of slugs){
 const h=heroes[slug];if(!h){errors.push(slug+': no hero');continue;}
 if(!h.alt||/[—·]/.test(h.alt))errors.push(slug+': missing or invalid alt text');
 for(const [src,budget]of [[h.src,250000],[h.smallSrc,150000]]){
  if(!src.startsWith('/notes/'+slug+'/')||src.includes('..')){errors.push(slug+': incorrect asset path');continue;}
  const p=path.join(root,'public',src),bytes=readFileSync(p),m=await sharp(bytes).metadata();
  const hash=createHash('sha256').update(bytes).digest('hex');
  const expected=(src===h.src?'hero-':'hero-small-')+hash.slice(0,12)+'.webp';
  if(path.basename(src)!==expected)errors.push(slug+': image filename does not match its contents');
  if(statSync(p).size>budget)errors.push(slug+': image exceeds delivery budget');
  if(!m.width||!m.height||m.width/m.height<1.5||m.width/m.height>2.1)errors.push(slug+': wrong image shape');
  if(src===h.src){
   if(m.width!==h.width||m.height!==h.height)errors.push(slug+': wrong declared dimensions');
   if(hashes.has(hash))errors.push(slug+': duplicate hero image');hashes.add(hash);
  }
 }
 const html=readFileSync(path.join(out,'notes',slug,'index.html'),'utf8');
 const head=html.split('</head>')[0],entry=sitemap.split('<loc>https://abosh.io/notes/'+slug+'/</loc>')[1]?.split('</url>')[0]||'';
 if(!html.includes('class="note-hero'))errors.push(slug+': no overlaid hero header');
 if(!html.includes('id="note-title"'))errors.push(slug+': missing live title');
 if(!html.includes('class="note-hero-byline"'))errors.push(slug+': missing live metadata');
 if(!head.includes('content="https://abosh.io'+h.src+'"'))errors.push(slug+': missing social image');
 if(!html.includes('"image":"https://abosh.io'+h.src+'"'))errors.push(slug+': missing article structured-data image');
 if(!entry.includes('https://abosh.io'+h.src))errors.push(slug+': missing image sitemap entry');
 if(!html.includes('srcSet="'+h.smallSrc+' 960w, '+h.src+' '+h.width+'w"')&&!html.includes('srcset="'+h.smallSrc+' 960w, '+h.src+' '+h.width+'w"'))errors.push(slug+': missing responsive sources');
}
if(errors.length){console.error(errors.join('\n'));process.exitCode=1;}else console.log(`Verified ${slugs.length} distinct clay heroes, responsive assets, live title/metadata, social images and image sitemap entries.`);
