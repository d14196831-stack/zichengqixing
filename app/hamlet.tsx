'use client';

import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, BookOpen, Download, Minus, Plus } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import notes from './hamlet-data.json';
import guide from './hamlet-editorial.json';
import episodes from './literature-data.json';
import type { OpenLiterature } from './literature';

const scenes = notes.acts.flatMap(a => a.scenes);
const numerals = ['一', '二', '三', '四', '五'];
const actNames = ['哀悼与来客', '窥探与试验', '求证与失手', '伤害的回声', '记忆与讲述'];
const sceneKey = (id: string) => `hamlet-scene-${id.replace('.', '-')}`;
const sceneById = (id: string) => scenes.find(s => s.id === id) ?? scenes[0];

export function isHamletEntry(id: string) {
 return guide.paths.some(p => id === `hamlet-${p.id}`) || scenes.some(s => id === sceneKey(s.id)) || guide.characters.some(c => id === `hamlet-person-${c.id}`) || notes.essays.some((_, i) => id === `hamlet-essay-${i}`) || episodes.some(e => e.workId === 'hamlet' && e.id === id);
}

function SceneLinks({ ids, open }: { ids: string[]; open: OpenLiterature }) {
 return <div className="hamlet-scene-links">{ids.map(id => <button key={id} onClick={() => open('hamlet', sceneKey(id))}><span>{id}</span>{sceneById(id).title}<ArrowUpRight size={16}/></button>)}</div>;
}

export function HamletStudy({ entryId, open, read }: { entryId: string; open: OpenLiterature; read: (chapter: number, paragraph?: number) => void }) {
 const [fontSize, setFontSize] = useState(20);
 const [lastPathId, setLastPathId] = useState('truth');
 useEffect(() => {
  const selectedPath = guide.paths.find(p => entryId === `hamlet-${p.id}`);
  if (selectedPath) setLastPathId(selectedPath.id);
  if (entryId.startsWith('hamlet-borrowed-')) {
   const frame = requestAnimationFrame(() => document.getElementById(entryId)?.scrollIntoView({ block: 'start' }));
   return () => cancelAnimationFrame(frame);
  }
 }, [entryId]);
 const mode = entryId.startsWith('hamlet-scene-') ? 'scenes' : entryId.startsWith('hamlet-person-') ? 'people' : entryId.startsWith('hamlet-essay-') ? 'essays' : 'paths';
 const path = guide.paths.find(p => entryId === `hamlet-${p.id}`) ?? guide.paths.find(p => p.id === lastPathId) ?? guide.paths[0];
 const scene = scenes.find(s => entryId === sceneKey(s.id)) ?? scenes[0];
 const sceneIndex = scenes.findIndex(s => s.id === scene.id);
 const act = notes.acts.find(a => a.act === Number(scene.id.split('.')[0]))!;
 const person = guide.characters.find(c => entryId === `hamlet-person-${c.id}`) ?? guide.characters[0];
 const essayIndex = notes.essays.findIndex((_, i) => entryId === `hamlet-essay-${i}`);
 const essay = notes.essays[Math.max(0, essayIndex)];
 const legacy = episodes.filter(e => e.workId === 'hamlet' && e.id.startsWith('hamlet-borrowed-'));
 const selectMode = (value: string) => open('hamlet', value === 'scenes' ? sceneKey(path.sceneIds[0]) : value === 'people' ? `hamlet-person-${guide.characters[0].id}` : value === 'essays' ? 'hamlet-essay-0' : `hamlet-${path.id}`);
 return <div className="hamlet-study">
  <header className="hamlet-opening"><img src="./hamlet-stage.webp" width="1536" height="1024" alt="" aria-hidden="true"/><div><p className="eyebrow">HAMLET / 莎士比亚</p><h2>看见他的痛苦，<br/>也看见他身边的人。</h2><p>哀悼、求证、复仇，直到最后的讲述。<br/>让五幕中的变化，重新照亮六扇门。</p></div><span className="hamlet-edition">英文全文补读<br/><strong>5 幕 · 20 场</strong><small>背景为帷幕与光的生成意象</small></span></header>
  <Tabs value={mode} onValueChange={v => selectMode(String(v))} className="hamlet-modes">
   <TabsList className="hamlet-mode-tabs" variant="line" aria-label="哈姆雷特的阅读方式"><TabsTrigger value="paths">六扇门互照</TabsTrigger><TabsTrigger value="scenes">五幕精读</TabsTrigger><TabsTrigger value="people">人物与关系</TabsTrigger><TabsTrigger value="essays">完读札记</TabsTrigger></TabsList>
   <TabsContent value="paths" className="hamlet-workspace literary-workspace">
    <nav className="hamlet-path-nav" aria-label="从六扇门理解哈姆雷特">{guide.paths.map(p => <button key={p.id} aria-pressed={path.id === p.id} onClick={() => open('hamlet', `hamlet-${p.id}`)}><span>{p.word}</span><strong>{p.title}</strong></button>)}</nav>
    <article className="hamlet-path" key={path.id}><div className="hamlet-path-heading"><span className="hamlet-door-mark" aria-hidden="true">{path.word}</span><div><p className="eyebrow">从场景回到价值根基</p><h3>{path.title}</h3><p>{path.lead}</p></div></div>
     <ol className="hamlet-stages" aria-label="把三个场景放在一起看">{path.stages.map((stage, i) => <li key={stage.sceneId}><span className="hamlet-stage-index">0{i + 1}</span><button onClick={() => open('hamlet', sceneKey(stage.sceneId))}><small>{stage.sceneId}</small><strong>{stage.label}</strong><ArrowUpRight size={16}/></button><p>{stage.text}</p></li>)}</ol>
     <div className="hamlet-comparison"><section><span className="small-label">照见根基</span><h4>这一层理解，从哪里长出来？</h4><p>{path.insight}</p><button className="text-link" onClick={() => read(path.door)}>回到体系「{path.word}」章 <ArrowUpRight size={16}/></button></section><section><span className="small-label">保留难处</span><h4>人物还有哪些部分，不能略去？</h4><p>{path.tension}</p></section></div>
     <blockquote className="hamlet-question"><span>带着这个问题重读</span><p>{path.question}</p></blockquote>
     <div className="hamlet-related"><p className="eyebrow">回到具体场景</p><SceneLinks ids={path.sceneIds} open={open}/></div>
    </article>
   </TabsContent>
   <TabsContent value="scenes" className="hamlet-scenes-panel">
    <Tabs value={String(act.act)} onValueChange={v => open('hamlet', sceneKey(notes.acts[Number(v) - 1].scenes[0].id))} className="hamlet-act-tabs"><TabsList className="hamlet-act-list" aria-label="选择幕">{notes.acts.map(a => <TabsTrigger value={String(a.act)} key={a.act}><span>第{numerals[a.act - 1]}幕</span><small>{actNames[a.act - 1]}</small></TabsTrigger>)}</TabsList><TabsContent value={String(act.act)} key={act.act}>
     <div className="hamlet-workspace literary-workspace hamlet-close-reading"><nav className="hamlet-scene-nav" aria-label={`第${numerals[act.act - 1]}幕场次`}><p className="eyebrow">本幕 / {act.scenes.length} 场</p>{act.scenes.map(s => <button key={s.id} aria-current={s.id === scene.id ? 'step' : undefined} onClick={() => open('hamlet', sceneKey(s.id))}><span>{s.id}</span><strong>{s.title}</strong></button>)}<p className="hamlet-nav-caption">按英文全文顺序补读<br/>情节与阅读解释分列</p></nav>
      <article className="hamlet-scene-reading" key={scene.id} style={{ '--hamlet-reading-size': `${fontSize / 16}rem` } as React.CSSProperties} aria-labelledby="hamlet-scene-title">
       <div className="hamlet-reader-toolbar"><span><BookOpen size={16}/> 场次 {scene.id} · {sceneIndex + 1} / 20</span><div className="type-controls" aria-label="札记正文字号"><button onClick={() => setFontSize(n => Math.max(18, n - 2))} disabled={fontSize === 18} aria-label="减小札记正文字号"><Minus size={16}/></button><span>{fontSize}</span><button onClick={() => setFontSize(n => Math.min(26, n + 2))} disabled={fontSize === 26} aria-label="增大札记正文字号"><Plus size={16}/></button></div></div>
       <h3 id="hamlet-scene-title">{scene.title}</h3>
       <section className="hamlet-plot"><span className="small-label">发生了什么 / 情节概述</span><p>{scene.summary}</p></section>
       <section className="hamlet-prose"><span className="small-label">停在细节里 / 本次细读</span>{scene.reading.map((p, i) => <p key={i}>{p}</p>)}</section>
       <blockquote className="hamlet-original-quote"><span className="small-label">英文原文 / {scene.id}</span><p lang="en">{scene.quote}</p><footer><span>释义</span>{scene.quoteMeaning}</footer><a href={notes.source} target="_blank" rel="noreferrer">在 Folger 校勘本中核对 <ArrowUpRight size={15}/></a></blockquote>
       <blockquote className="hamlet-question"><span>停一停</span><p>{scene.question}</p></blockquote>
       <div className="hamlet-scene-doors"><span>带回六扇门</span>{guide.paths.filter(p => p.sceneIds.includes(scene.id)).map(p => <button key={p.id} onClick={() => open('hamlet', `hamlet-${p.id}`)}>{p.word} · {p.title}<ArrowUpRight size={14}/></button>)}</div>
       <Accordion className="hamlet-accordion"><AccordionItem value="act-reflection"><AccordionTrigger>读完第{numerals[act.act - 1]}幕，再回看</AccordionTrigger><AccordionContent>{act.actReflection.map((p, i) => <p key={i}>{p}</p>)}</AccordionContent></AccordionItem></Accordion>
       <div className="hamlet-pagination"><button disabled={sceneIndex === 0} onClick={() => open('hamlet', sceneKey(scenes[sceneIndex - 1].id))}><ArrowLeft size={17}/> 上一场</button><span>{scene.id}</span>{sceneIndex < scenes.length - 1 ? <button onClick={() => open('hamlet', sceneKey(scenes[sceneIndex + 1].id))}>下一场 <ArrowRight size={17}/></button> : <button onClick={() => open('hamlet', 'hamlet-essay-0')}>进入完读札记 <ArrowRight size={17}/></button>}</div>
      </article>
     </div>
    </TabsContent></Tabs>
   </TabsContent>
   <TabsContent value="people" className="hamlet-workspace literary-workspace"><nav className="hamlet-person-nav" aria-label="选择人物">{guide.characters.map(c => <button key={c.id} aria-pressed={person.id === c.id} onClick={() => open('hamlet', `hamlet-person-${c.id}`)}><strong>{c.name}</strong><span>{c.role}</span></button>)}</nav><article className="hamlet-person" key={person.id}><header><img src="./hamlet-stage.webp" width="1536" height="1024" alt="" aria-hidden="true" loading="lazy"/><p className="eyebrow">一个人，不止一种位置</p><h3>{person.name}</h3><span>{person.role}</span></header><section><h4>跟着他与她的处境读</h4><p>{person.thread}</p></section><section className="hamlet-person-limit"><h4>还不能替人物说定的事</h4><p>{person.limit}</p></section><div className="hamlet-related"><p className="eyebrow">在这几场重新相遇</p><SceneLinks ids={person.sceneIds} open={open}/></div></article></TabsContent>
   <TabsContent value="essays" className="hamlet-workspace literary-workspace"><nav className="hamlet-essay-nav" aria-label="八则完读札记">{notes.essays.map((e, i) => <button key={e.title} aria-current={e === essay ? 'page' : undefined} onClick={() => open('hamlet', `hamlet-essay-${i}`)}><span>{String(i + 1).padStart(2, '0')}</span>{e.title}</button>)}</nav><article className="hamlet-essay" key={essay.title}><p className="eyebrow">完整阅读补记 / {Math.max(0, essayIndex) + 1} · 8</p><h3>{essay.title}</h3>{essay.paragraphs.map((p, i) => <p key={i}>{p}</p>)}<div className="hamlet-pagination"><button disabled={essayIndex <= 0} onClick={() => open('hamlet', `hamlet-essay-${essayIndex - 1}`)}><ArrowLeft size={16}/> 上一则</button>{essayIndex < 7 && <button onClick={() => open('hamlet', `hamlet-essay-${Math.max(0, essayIndex) + 1}`)}>下一则 <ArrowRight size={16}/></button>}</div></article></TabsContent>
  </Tabs>
  <section className="hamlet-revisions"><div><p className="eyebrow">把补读带回体系</p><h3>三句话，读得更完整。</h3><p>原稿仍在。让新的阅读，补上引用背后的处境。</p></div><Accordion className="hamlet-accordion">{guide.corrections.map(c => <AccordionItem value={c.id} key={c.id}><AccordionTrigger>{c.title}</AccordionTrigger><AccordionContent><p>{c.reading}</p><SceneLinks ids={c.sceneIds} open={open}/><button className="text-link" onClick={() => read(c.chapter, c.sourceParagraph)}>回到体系原文 <ArrowUpRight size={16}/></button></AccordionContent></AccordionItem>)}</Accordion></section>
  <Accordion className="hamlet-archive hamlet-accordion" defaultValue={entryId.startsWith('hamlet-borrowed-') ? ['archive'] : []} key={entryId.startsWith('hamlet-borrowed-') ? entryId : 'closed-archive'}><AccordionItem value="archive"><AccordionTrigger>保留早期回看 · 《卡拉马佐夫兄弟》怎样借用这部戏</AccordionTrigger><AccordionContent><p className="hamlet-source-note">以下两则来自此前提供的阅读汇编，是后续作品中的引用与回看。本次全文补读另行成篇。</p>{legacy.map(e => <section key={e.id} id={e.id}><h4>{e.title}</h4><p>{e.scene}</p><p>{e.insight}</p><p>{e.tension}</p><blockquote>{e.quote}</blockquote><p className="hamlet-source-note">{e.sourceLabel}</p><details><summary>查看汇编原有段落</summary>{e.excerpts.map(p => <p key={p.id}><small>札记段落 {p.id + 1}</small>{p.text}</p>)}</details></section>)}</AccordionContent></AccordionItem></Accordion>
  <footer className="hamlet-sources"><p>据2026年9月6日《哈姆雷特完整阅读补记》整理，覆盖 Folger 英文校勘本五幕二十场。情节概述、英文引文、释义与本次解释分别呈现；人物的矛盾与未确定处也保留在内。包含结局。</p><div><a href={notes.source} target="_blank" rel="noreferrer">英文底本 <ArrowUpRight size={16}/></a><a href="./hamlet-notebook.md" download="哈姆雷特_完整阅读补记.md">完整补记 <Download size={16}/></a></div></footer>
 </div>;
}

export function HamletReadingNote({ paragraphIds, open }: { paragraphIds: number[]; open: OpenLiterature }) {
 const items = guide.corrections.filter(c => paragraphIds.includes(c.sourceParagraph));
 if (!items.length) return null;
 return <aside className="hamlet-reading-note"><p className="eyebrow">哈姆雷特 / 补读提示</p>{items.map(c => <div key={c.id}><h3>{c.title}</h3><p>{c.reading}</p><button onClick={() => open('hamlet', sceneKey(c.sceneIds[0]))}>把这句话放回场景 {c.sceneIds[0]} <ArrowUpRight size={16}/></button></div>)}</aside>;
}
