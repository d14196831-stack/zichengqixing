'use client';
import { Fragment, useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, BookOpen, Minus, Plus } from 'lucide-react';
import { SidebarProvider, Sidebar, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import { Switch } from '@/components/ui/switch';
import { StudyLens, type StudyGroup } from './study-lens';
import { StudyFigure } from './study-figure';
import { chapterVisuals } from './visual-system';
import content from './content.json';
import editorial from './editorial.json';
import study from './chapter-study.json';
import { ReadingConnections, type OpenLiterature } from './literature';
import { HamletReadingNote } from './hamlet';

type SourceParagraph = {index:number;style:string;text:string};
function OriginalParagraph({paragraph, referenced, guided}:{paragraph:SourceParagraph;referenced:boolean;guided:boolean}) {
 const lead=guided&&paragraph.style==='Normal'?paragraph.text.match(/^(.{2,24}?[。？！])(?=\s)/)?.[1]:null;
 return <p id={`paragraph-${paragraph.index}`} data-source-paragraph={paragraph.index} className={`${paragraph.style==='Verse'?'verse':paragraph.style==='Final Question'?'final-question':''} ${referenced?'referenced-paragraph':''}`}>{lead?<><strong>{lead}</strong>{paragraph.text.slice(lead.length)}</>:paragraph.text}</p>;
}
export function Reader({chapter, paragraph, read, practice, literature}: {chapter:number;paragraph:number|null;read:(id:number,paragraph?:number)=>void;practice:()=>void;literature:OpenLiterature}) {
 const [fontSize,setFontSize]=useState(20);
 const [guided,setGuided]=useState(true);
 const [activeGroup,setActiveGroup]=useState('');
 const c=content.chapters[chapter];
 const guide=editorial.chapters[chapter];
 const groups=study[chapter].groups as StudyGroup[];
 const visual=chapterVisuals[chapter];
 const sourceById=new Map(c.paragraphs.map(p=>[p.index,p]));
 const jumpToGroup=(id:string)=>document.getElementById(`study-${chapter}-${id}`)?.scrollIntoView({block:'start',behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
 useEffect(()=>{
  setActiveGroup(groups[0].id);
  if(paragraph!==null){requestAnimationFrame(()=>document.getElementById(`paragraph-${paragraph}`)?.scrollIntoView({block:'center'}));}
 },[chapter,paragraph]);
 useEffect(()=>{
  if(!guided)return;
  const observer=new IntersectionObserver(entries=>{
   const visible=entries.find(e=>e.isIntersecting);
   if(visible)setActiveGroup((visible.target as HTMLElement).dataset.group??'');
  },{rootMargin:'-10% 0px -72% 0px',threshold:0});
  const elements=groups.map(g=>document.getElementById(`study-${chapter}-${g.id}`)).filter((x):x is HTMLElement=>x!==null);
  elements.forEach(e=>observer.observe(e));
  return ()=>observer.disconnect();
 },[chapter,guided]);
 return <SidebarProvider className={`reader-layout ${guided?'guided-reading':'pure-reading'}`}>
  <Sidebar collapsible="none" className="reader-sidebar"><SidebarContent>
   <p className="eyebrow">CONTENTS / 目录</p>
   <SidebarMenu>{editorial.chapters.map((x,i)=><SidebarMenuItem key={x.id}><SidebarMenuButton onClick={()=>read(i)} isActive={chapter===i} aria-current={chapter===i?'page':undefined}><span className="chapter-number">{i===0?'序':i===7?'园':i===8?'终':String(i).padStart(2,'0')}</span><span><strong>{i>0&&i<7?['真','情','苦','手','人','时'][i-1]:i===0?'序':i===7?'园中 · 沂水':'结语'}</strong><small>{i>0&&i<7?['所是 · 所见','所爱','所受','所择 · 所为','共生','所成'][i-1]:i===0?'把账本收进抽屉':i===7?'体系要保护的生活':'四个问题，一个人'}</small></span></SidebarMenuButton></SidebarMenuItem>)}</SidebarMenu>
   {guided&&<div className="chapter-local-nav"><p className="eyebrow">本章脉络 · 编辑分节</p><SidebarMenu>{groups.map((g,i)=><SidebarMenuItem key={g.id}><SidebarMenuButton onClick={()=>jumpToGroup(g.id)} isActive={activeGroup===g.id} aria-current={activeGroup===g.id?'location':undefined}><span>{String(i+1).padStart(2,'0')}</span><span>{g.title}</span></SidebarMenuButton></SidebarMenuItem>)}</SidebarMenu></div>}
   <div className="reading-note">可以从一个问题进入，<br/>也可以完整读完一章。</div>
  </SidebarContent></Sidebar>
  <article className="reader-article" style={{'--reading-size':`${fontSize/16}rem`} as React.CSSProperties}>
   <div className="reader-toolbar"><span><BookOpen size={15}/> 原文 · {chapter+1} / 9</span><div className="reader-controls"><div className="study-switch"><Switch id="study-mode" checked={guided} onCheckedChange={setGuided}/><label htmlFor="study-mode">{guided?'精读提示已开':'纯原文'}</label></div><div className="type-controls" aria-label="正文字号"><button onClick={()=>setFontSize(s=>Math.max(18,s-2))} disabled={fontSize===18} aria-label="减小正文字号"><Minus size={15}/></button><span>{fontSize}</span><button onClick={()=>setFontSize(s=>Math.min(26,s+2))} disabled={fontSize===26} aria-label="增大正文字号"><Plus size={15}/></button></div></div></div>
   <header className="chapter-opening" key={`cover-${chapter}`}>
    <img className="chapter-opening-image" src={`./${visual.image}`} alt="" aria-hidden="true" width="1536" height="1024" style={{objectPosition:visual.position}}/>
    <span className="chapter-opening-motif" aria-hidden="true">{visual.motif}</span>
    <p className="eyebrow">{chapter===0?'序':chapter===7?'园中':chapter===8?'结语':`第${'一二三四五六'[chapter-1]}章`}</p><h1>{c.title.split('｜')[1]}</h1>
    <blockquote className="chapter-opening-quote">“{visual.quote}”</blockquote><span className="chapter-opening-caption">{visual.caption}</span>
   </header>
   {guided&&<div className="reader-overview"><span>本章导读<br/>编辑归纳</span><p>{guide.intro}</p><nav className="chapter-pathway" aria-label="本章主题">{groups.map((g,i)=><Fragment key={g.id}>{i>0&&<span aria-hidden="true">·</span>}<button onClick={()=>jumpToGroup(g.id)}>{g.title}</button></Fragment>)}</nav></div>}
   {chapter===0&&<div className="book-opening"><h2>{content.title}</h2><p>{content.subtitle}</p><blockquote>{content.verse}</blockquote></div>}
   {groups.map((g,i)=><section className="reading-group" key={`${chapter}-${g.id}`} id={`study-${chapter}-${g.id}`} data-group={g.id}>
    {guided&&<header className="reading-group-heading"><span className="reading-group-number">{String(i+1).padStart(2,'0')}</span><div><p className="eyebrow">{g.kicker}</p><h2>{g.title}</h2></div><p className="reading-group-intro">{g.intro}</p></header>}
    {guided&&<StudyFigure id={g.id}/>}
    <div className="original-text">{g.paragraphs.map(id=><OriginalParagraph key={id} paragraph={sourceById.get(id)!} referenced={paragraph===id} guided={guided}/>)}</div>
    {guided&&<HamletReadingNote paragraphIds={g.paragraphs} open={literature}/>}
    {guided&&<StudyLens group={g} open={i===0}/>}
   </section>)}
   {guided&&<ReadingConnections chapter={chapter} open={literature}/>}
   {guided&&<div className="reading-close"><img src={`./${visual.image}`} alt="" aria-hidden="true" width="1536" height="1024" loading="lazy"/><span className="small-label">把这一章，带回自己的生活</span><p>{guide.reflection}</p><button className="subtle-link" onClick={practice}>带着一件具体的事，打开四问 <ArrowUpRight size={16}/></button></div>}
   <div className="reader-navigation">{chapter>0?<button onClick={()=>read(chapter-1)}><ArrowLeft size={18}/><span><small>上一篇</small>{editorial.chapters[chapter-1].label}</span></button>:<span/>}{chapter<8?<button onClick={()=>read(chapter+1)}><span><small>下一篇</small>{editorial.chapters[chapter+1].label}</span><ArrowRight size={18}/></button>:<button onClick={practice}><span><small>把理解带回一件具体的事</small>四问练习</span><ArrowRight size={18}/></button>}</div>
   <p className="reader-attribution">原文来自《自成其形_阅读修订稿》，保留原稿文字与顺序。章内分节、概念辨析与情境为编辑辅助内容；关闭“精读提示”可连续阅读原文。图像为文本意象，并非实际地点记录。</p>
  </article>
 </SidebarProvider>;
}
