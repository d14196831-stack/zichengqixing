'use client';
import { ArrowLeft, ArrowRight, ArrowUpRight, BookOpen, Quote } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { literaryWorks, chapterWords, chapterReadingCases } from './literature-meta';
import episodes from './literature-data.json';
import { HamletStudy } from './hamlet';

export type OpenLiterature = (work:string, episode?:string)=>void;
export function Literature({workId,episodeId,open,read}:{workId:string;episodeId:string;open:OpenLiterature;read:(chapter:number,paragraph?:number)=>void}) {
 const work=literaryWorks.find(w=>w.id===workId)??literaryWorks[0];
 const entries=episodes.filter(e=>e.workId===work.id);
 const entry=entries.find(e=>e.id===episodeId)??entries[0];
 const index=entries.findIndex(e=>e.id===entry.id);
 return <section className="literature-view">
  <header className="literature-heading"><div><p className="eyebrow">READING IN DIALOGUE / 阅读互照</p><h1>让道理，重新遇见人。</h1></div><p>从一处情境，读懂一层根基。<br/>也让作品中未被解决的难题，继续向体系提问。</p></header>
  <Tabs value={work.id} onValueChange={v=>open(String(v))} className="literary-tabs">
   <TabsList className="literary-shelf" aria-label="选择作品">{literaryWorks.map(w=><TabsTrigger value={w.id} key={w.id}><span className="shelf-number">{w.number}</span><span><strong>{w.title}</strong><small>{w.id==='hamlet'?'五幕完整补读':w.id==='red'?'前八十回':w.id==='poem'?'小序与全词':'阅读札记'}</small></span></TabsTrigger>)}</TabsList>
   {literaryWorks.map(w=><TabsContent value={w.id} key={w.id}>
    {w.id!=='hamlet'&&<div className="literary-book-intro"><div><span className="small-label">{w.author}</span><h2>{w.theme}</h2></div><div><p>{w.note}</p><span className="literary-scope">{w.scope}</span></div></div>}
   </TabsContent>)}
  </Tabs>
  {work.id==='hamlet'?<HamletStudy entryId={episodeId} open={open} read={read}/>:<div className="literary-workspace">
   <nav className="literary-scenes" aria-label={`${work.title}的阅读情境`}><p className="eyebrow">从一处细节进入</p>{entries.map((e,i)=><button key={e.id} onClick={()=>open(work.id,e.id)} aria-pressed={e.id===entry.id}><span className="scene-index">0{i+1}</span><span><strong>{e.title}</strong><small>{e.theme}</small></span><ArrowUpRight size={17}/></button>)}<p className="scene-nav-note">作品情境、体系关联与提问<br/>均据汇编整理。</p></nav>
   <article className="literary-entry">
    <section className={`literary-scene literary-scene-${work.id}`} aria-labelledby="episode-title"><img src={`./${work.image}`} width="1536" height="1024" alt="" aria-hidden="true" style={{objectPosition:work.position}}/><span className="literary-watermark" aria-hidden="true">{work.word}</span><div className="literary-scene-content"><p className="eyebrow">{work.title} / {String(index+1).padStart(2,'0')}</p><h3 id="episode-title">{entry.title}</h3><p className="scene-narrative">{entry.scene}</p><span className="scene-attribution">据阅读汇编整理 · 背景为生成意象</span></div></section>
    <div className="literary-dialogue"><section><p className="eyebrow"><span className="dialogue-mark">↗</span> 照见体系</p><h4>{entry.theme}</h4><p>{entry.insight}</p><div className="literary-doors">{entry.doors.map(d=><button key={d} onClick={()=>read(d)} aria-label={`阅读体系「${chapterWords[d]}」章`}>{chapterWords[d]}<ArrowUpRight size={14}/></button>)}</div></section><section><p className="eyebrow"><span className="dialogue-mark">↔</span> 留住张力</p><h4>这层理解，还不能抹去什么？</h4><p>{entry.tension}</p></section></div>
    <blockquote className="literary-quote"><Quote size={24} aria-hidden="true"/><div><p>{entry.quote}</p><cite>阅读札记节选 · {entry.sourceLabel}</cite></div></blockquote>
    <div className="literary-question"><span>留给自己的问题</span><p>{entry.question}</p><small>可以暂不回答，也不必与札记得出同一个结论。</small></div>
    <Accordion className="literary-source" key={`source-${entry.id}`}><AccordionItem value="source"><AccordionTrigger><span><BookOpen size={17}/> 展开这处札记，核对上下文</span></AccordionTrigger><AccordionContent><p className="source-boundary">{entry.sourceLabel}。以下为用户提供的《五部作品_阅读记录汇编》中的札记文字；札记中的文学引句、情节概述与阅读判断保留其原有语境。</p>{entry.excerpts.map(p=><p className="literary-original" key={p.id}><span>札记段落 {p.id+1}</span>{p.text}</p>)}</AccordionContent></AccordionItem></Accordion>
    <div className="literary-pagination"><button disabled={index===0} onClick={()=>open(work.id,entries[index-1].id)}><ArrowLeft size={17}/> 上一处情境</button><span>{index+1} / {entries.length}</span>{index<entries.length-1?<button onClick={()=>open(work.id,entries[index+1].id)}>下一处情境 <ArrowRight size={17}/></button>:<button onClick={()=>open(literaryWorks[(literaryWorks.indexOf(work)+1)%literaryWorks.length].id)}>另一部作品 <ArrowRight size={17}/></button>}</div>
   </article>
  </div>}
  <p className="literary-editorial-note">这里呈现的是阅读札记与体系之间的编辑互照。《哈姆雷特》依据本次完整补读，其余作品依据原阅读汇编；不把人物等同于概念，也不把札记的判断称作作家的最终立场。体系正文沿用《自成其形_阅读修订稿》；汇编中的阶段性对照保留其当时版本。</p>
 </section>;
}

export function ReadingConnections({chapter,open}:{chapter:number;open:OpenLiterature}) {
 const related=chapterReadingCases[chapter].map(id=>episodes.find(e=>e.id===id)!);
 if(!related.length)return null;
 return <aside className="reading-connections"><div><p className="eyebrow">带着这一章，回到作品</p><h2>从具体的人，理解「{chapterWords[chapter]}」。</h2></div><div className="reading-connection-list">{related.map(e=><button key={e.id} onClick={()=>open(e.workId,e.id)}><span>{literaryWorks.find(w=>w.id===e.workId)?.title}</span><strong>{e.title}</strong><small>{e.theme}</small><ArrowUpRight size={18}/></button>)}</div></aside>;
}

export function ReadingInvitation({open}:{open:OpenLiterature}) {
 return <section className="reading-invitation"><img src="./garden.webp" width="1536" height="1024" alt="" aria-hidden="true" loading="lazy"/><div className="reading-invitation-copy"><p className="eyebrow">五部作品 / 五个追问</p><h2>先看见一个人，<br/>再谈一种道理。</h2><p>嫩叶与眼泪，诗与一杯水，雨中的步调。<br/>这些细节，让根基有了可感的重量。</p><span className="editorial-label">据阅读汇编整理 · 园林为生成意象</span></div><div className="reading-invitation-list">{literaryWorks.map(w=><button key={w.id} onClick={()=>open(w.id)}><span>{w.number}</span><div><strong>{w.title}</strong><small>{w.theme}</small></div><ArrowUpRight size={19}/></button>)}</div></section>;
}
