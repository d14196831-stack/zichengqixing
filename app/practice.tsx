'use client';
import { useState } from 'react';
import { ArrowUpRight, ArrowLeft } from 'lucide-react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import editorial from './editorial.json';
export function Practice({read, close}:{read:(id:number,paragraph?:number)=>void;close:()=>void}) {
 const [subject,setSubject]=useState('');
 const [answers,setAnswers]=useState(['','','','']);
 const [action,setAction]=useState('');
 const p=editorial.practice;
 return <div className="practice-view"><div className="section-heading"><div><p className="eyebrow">RETURN TO LIFE / 四问练习</p><h1>把四问交给一件具体的事。</h1></div><button className="subtle-link" onClick={()=>read(8,109)}>读四问的原文 <ArrowUpRight size={16}/></button></div><p className="practice-intro">{p.description}</p>
  <div className="practice-layout"><div className="writing-surface"><label htmlFor="practice-subject" className="subject-label">{p.subjectLabel}</label><textarea id="practice-subject" className="subject-input" rows={2} value={subject} onChange={e=>setSubject(e.target.value)} placeholder={p.subjectPlaceholder}/>
   <Accordion defaultValue={['question-0']} className="question-accordion">{p.prompts.map((q,i)=><AccordionItem value={`question-${i}`} key={q.title}><AccordionTrigger><span className="question-index">0{i+1}</span><span className="question-title">{q.title}<small>{q.original}</small></span><span className="draft-indicator">{answers[i].trim()?'已写下':'可留空'}</span></AccordionTrigger><AccordionContent><label htmlFor={`answer-${i}`} className="answer-help">{q.help}<span>编辑提示</span></label><textarea id={`answer-${i}`} rows={5} value={answers[i]} onChange={e=>setAnswers(old=>old.map((v,k)=>k===i?e.target.value:v))} placeholder={q.placeholder}/></AccordionContent></AccordionItem>)}</Accordion>
   <div className="next-action"><label htmlFor="next-action">{p.nextActionLabel}</label><p>{p.nextActionHelp}</p><textarea id="next-action" rows={3} value={action} onChange={e=>setAction(e.target.value)} placeholder="我能开始的一小步是……"/></div><p className="draft-note">书写只在当前页面保留，切换阅读方式不会丢失；刷新或关闭页面会清空。</p>
  </div><aside className="practice-aside"><span className="small-label">带着根基，再打开账本</span><h2>这件事之前，<br/>先有一个人。</h2><p>事实可以修正判断，不能给人格定价。方法帮助你看清取舍，不替你决定什么值得。</p><div className="practice-boundaries"><span>不骗自己</span><span>不吃人</span></div><blockquote>“账本不坐主位。”</blockquote><p>可以写“还不知道”，也可以暂时停在这里。</p><button className="text-link" onClick={()=>read(7)}>去园中坐一会儿 <ArrowUpRight size={17}/></button></aside></div>
  <section className="practice-garden"><img className="practice-garden-image" src="./garden.webp" alt="" aria-hidden="true" width="1536" height="1024" loading="lazy"/><span className="small-label">还有一句不是问，是看</span><h2>园子里那个角落，有没有人坐着。</h2><p>{p.gardenHelp}</p><button onClick={close} className="subtle-link"><ArrowLeft size={17}/> 收起账本，回到根基</button></section>
 </div>;
}
