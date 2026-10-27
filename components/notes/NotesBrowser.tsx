'use client';

import { useId, useMemo, useRef, useState } from 'react';
import { TLink } from '@/components/shell/transitions';
import { filterNotes, type NotesIndexItem } from '@/lib/notes-index';
import { NotesField } from './NotesField';
import './NotesBrowser.css';

export function NotesBrowser({notes}:{notes:NotesIndexItem[]}) {
  const [query,setQuery]=useState(''),[topic,setTopic]=useState('');
  const search=useRef<HTMLInputElement>(null),id=useId();
  const topics=useMemo(()=>[...new Set(notes.map(n=>n.topic).filter(Boolean))].sort().map(name=>({name,count:notes.filter(n=>n.topic===name).length})),[notes]);
  const visible=useMemo(()=>filterNotes(notes,query,topic),[notes,query,topic]);
  const filtered=query.trim()!==''||topic!=='';
  const clear=()=>{setQuery('');setTopic('');};
  const showResults=()=>document.getElementById('latest')?.scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
  const changeSearch=()=>{search.current?.scrollIntoView({block:'center'});search.current?.focus({preventScroll:true});};
  return <>
    <NotesField browse>
      <form className="notes-browse-controls" role="search" onSubmit={e=>{e.preventDefault();showResults();}}>
        <div className="notes-search-box">
          <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/></svg>
          <label className="sr-only" htmlFor={id}>Search notes</label>
          <input id={id} ref={search} type="search" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search notes, topics or terms" autoComplete="off" aria-controls="notes-results"/>
          {query&&<button type="button" className="notes-clear-search" aria-label="Clear search" onClick={()=>{setQuery('');search.current?.focus();}}>×</button>}
        </div>
        <div className="notes-topic-buttons" role="group" aria-label="Filter by category">
          <button type="button" aria-pressed={topic===''} onClick={()=>setTopic('')}>All topics <span>{notes.length}</span></button>
          {topics.map(t=><button key={t.name} type="button" aria-pressed={topic===t.name} onClick={()=>setTopic(t.name)}>{t.name} <span>{t.count}</span></button>)}
        </div>
        <label className="notes-topic-select"><span className="sr-only">Filter by category</span><select value={topic} onChange={e=>setTopic(e.target.value)}><option value="">All topics ({notes.length})</option>{topics.map(t=><option key={t.name} value={t.name}>{t.name} ({t.count})</option>)}</select></label>
        <div className="notes-search-actions"><p role="status" aria-live="polite">{filtered?`${visible.length} of ${notes.length} notes`: `${notes.length} notes to explore`}</p><button type="submit">View {visible.length===1?'note':'notes'} <span aria-hidden="true">↓</span></button></div>
      </form>
    </NotesField>
    <section className="notes-index-list frame" id="latest" aria-labelledby="latest-title">
      <header className="notes-index-head notes-browser-head"><div><h2 id="latest-title">{filtered?'Search results':'Latest writing'}</h2><p>{visible.length} {visible.length===1?'note':'notes'}{topic?` in ${topic}`:''}</p></div><div className="notes-list-actions">{filtered&&<button type="button" onClick={clear}>Clear filters</button>}<button type="button" onClick={changeSearch}>Search & filters <span aria-hidden="true">↑</span></button></div></header>
      {topic==='Continuous improvement'&&<aside className="notes-topic-intro" aria-label="Continuous improvement foundations">
        <p>Start with the <TLink href="/notes/continuous-improvement-explained/">continuous improvement overview</TLink>. Foundational guides also sit under Operational excellence: <TLink href="/notes/5-whys-example/">5 Whys</TLink>, <TLink href="/notes/5s-methodology-example/">5S</TLink>, <TLink href="/notes/pdca-cycle-example/">PDCA</TLink>, <TLink href="/notes/control-charts-explained/">control charts</TLink> and <TLink href="/notes/lean-daily-management/">daily management</TLink>.</p>
      </aside>}
      <ol id="notes-results" className="notes-browser-rows">
        {visible.map(n=><li key={n.slug}>
          <TLink href={`/notes/${n.slug}/`} className="notes-browser-row">
            <span className="notes-browser-image"><img src={n.image} alt="" width={960} height={540} loading="lazy" decoding="async"/></span>
            <span className="notes-browser-copy"><span className="notes-browser-topic">{n.topic}</span><span className="notes-browser-title">{n.title}</span><span className="notes-browser-summary">{n.summary}</span><span className="notes-browser-meta"><time dateTime={n.date}>{n.displayDate}</time><span>{n.readingMinutes} min read</span></span></span>
          </TLink>
        </li>)}
      </ol>
      {visible.length===0&&<div className="notes-search-empty"><h3>No notes match this search.</h3><p>Try a shorter term or another category.</p><button type="button" onClick={clear}>Show all notes</button></div>}
    </section>
  </>;
}
