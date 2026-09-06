'use client';
import { Lightbulb, ArrowDownRight } from 'lucide-react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

export type StudyGroup = {
 id:string; title:string; kicker:string; intro:string; paragraphs:number[];
 lens:{title:string;items:{label:string;description:string;example:string}[];boundary:string;question:string};
};
export function StudyLens({group, open=false}:{group:StudyGroup;open?:boolean}) {
 const lens=group.lens;
 return <Accordion className="study-lens" defaultValue={open?['lens']:[]}>
  <AccordionItem value="lens"><AccordionTrigger className="lens-trigger"><span className="lens-symbol"><Lightbulb size={19}/></span><span className="lens-trigger-title"><small>停一下，把概念分清</small><strong>{lens.title}</strong><span>{lens.items.map(x=>x.label).join(' / ')}</span></span><span className="lens-open-label">展开辨析</span></AccordionTrigger>
   <AccordionContent><Tabs defaultValue="0" className="lens-tabs"><TabsList className="lens-choices" aria-label={`${lens.title}的概念`}>{lens.items.map((item,i)=><TabsTrigger key={i} value={String(i)}><span>{String(i+1).padStart(2,'0')}</span>{item.label}</TabsTrigger>)}</TabsList>{lens.items.map((item,i)=><TabsContent key={i} value={String(i)}><div className="lens-explanation"><div><span className="small-label">如何理解</span><h4>{item.label}</h4><p>{item.description}</p></div><div className="lens-example"><span className="small-label">放到具体情境里</span><p>{item.example}</p></div></div></TabsContent>)}</Tabs><div className="lens-boundary"><span>边界</span><p>{lens.boundary}</p></div><div className="lens-question"><ArrowDownRight size={18}/><p>{lens.question}</p></div><span className="lens-credit">概念解释、情境与问题为编辑辅助内容</span></AccordionContent>
  </AccordionItem>
 </Accordion>;
}
