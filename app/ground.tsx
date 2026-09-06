'use client';
import { useState } from 'react';
import { ArrowUpRight, ArrowRight, BookOpen, Plus } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import foundations from './foundations.json';
import { ReadingInvitation, type OpenLiterature } from './literature';
import { rootReadingLinks, literaryWorks } from './literature-meta';

export function Ground({read, explore, literature}: {read:(id:number, paragraph?:number)=>void; explore:()=>void; literature:OpenLiterature}) {
 const [level,setLevel]=useState('reality');
 return <div className="ground-view">
  <section className="ground-opening"><div className="ground-title"><p className="eyebrow">THE GROUND / 价值根基</p><h1>世界有其所是，<br/>人有其自身<span>。</span></h1><p className="ground-lead">不要求世界迁就自己，<br/>也不允许世界取消自己。</p><span className="source-caption">——《自成其形》</span></div><figure className="garden-figure"><img src="./garden.webp" alt="敞开的圆洞门内，一棵自然生长的树与石凳；墙围出空间，门让人走入。" width="1536" height="1024"/></figure><div className="ground-scene-note"><span>墙为人修，不是人为墙活。</span><small>园林意象 · AI（人工智能）生成</small></div></section>
  <div className="values-band"><div><span>两道墙 · 不可交换的边界</span><button onClick={()=>{setLevel('ethics');document.getElementById('root-explorer')?.scrollIntoView({block:'start'});}}>不骗自己 <span>/</span> 不吃人 <ArrowUpRight size={17}/></button></div><div><span>园子里的人 · 对生命的邀请</span><button onClick={()=>{setLevel('life');document.getElementById('root-explorer')?.scrollIntoView({block:'start'});}}>先爱生命，再找意义 <ArrowUpRight size={17}/></button></div></div>
  <div className="ground-section-title" id="root-explorer"><h2>从根部理解这套体系</h2><p>五个层面为编辑归纳。点击展开主张与边界。</p></div>
  <Tabs value={level} onValueChange={v=>setLevel(String(v))} orientation="vertical" className="ground-explorer">
   <TabsList aria-label="哲学底座的五个层面" className="ground-tabs">{foundations.levels.map((l,i)=><TabsTrigger key={l.id} value={l.id}><span className="level-index">0{i+1}</span><span className="level-label">{l.label}<strong>{l.title}</strong></span><ArrowUpRight size={18}/></TabsTrigger>)}</TabsList>
   <div className="ground-panels">{foundations.levels.map((l,i)=><TabsContent value={l.id} key={l.id}><article className="ground-card"><div className="small-label"><span>{l.label}</span><span>编辑导读</span></div><h3>{l.title}</h3><p>{l.description}</p><blockquote>“{l.quote}”<cite>原文 · {i<2?'真':i===2?'序':i===3?'序':'时'}</cite></blockquote><details><summary>把这层意思读准 <Plus size={16}/></summary><p>{l.doNotSimplify[0]}</p></details><button className="text-link" onClick={()=>read(i<2?1:i===2||i===3?0:6,l.quoteIndex)}>回到这句话的原文 <ArrowUpRight size={18}/></button><button className="root-reading-link" onClick={()=>literature(rootReadingLinks[l.id].work,rootReadingLinks[l.id].episode)}><BookOpen size={19}/><span><small>阅读互照 · {literaryWorks.find(w=>w.id===rootReadingLinks[l.id].work)?.title}</small>{rootReadingLinks[l.id].theme}</span><ArrowUpRight size={18}/></button></article></TabsContent>)}</div>
  </Tabs>
  <ReadingInvitation open={literature}/>
  <section className="root-bridge"><div><p className="eyebrow">从根基，走入生活</p><h2>判断决定取舍，<br/>分寸让取舍显形。</h2></div><div><p>世界判断辨认真、值得与不可交换；分寸决定取舍以何种比例呈现。两者都要经过“不骗自己、不吃人”的边界。</p><p>真、情、苦、手、人、时，是这些根基进入生活的六扇门。</p><button onClick={explore} className="text-link">展开六扇门的体系地图 <ArrowRight size={18}/></button></div></section>
  <section className="coexistence-scene"><img src="./forest.webp" alt="树干各自向不同方向生长，枝叶之间留有光与空间。" width="1536" height="1024" loading="lazy"/><div className="coexistence-copy"><p className="eyebrow">关系中的根基</p><h2>各自成形，<br/>才可能彼此成林。</h2><p>不因亲密取消独立，不因独立拒绝照料。</p><button className="scene-link" onClick={()=>read(5,85)}>从「人」这一章，理解共生 <ArrowUpRight size={18}/></button><small>原文节选 · 树林为生成意象</small></div></section>
 </div>;
}
