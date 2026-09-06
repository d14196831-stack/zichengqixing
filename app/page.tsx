'use client';
import { useEffect, useState } from 'react';
import { ArrowUpRight, MoveUpRight } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import content from './content.json';
import { Ground } from './ground';
import { useFrameworkTool } from './framework-tool';
import { Reader } from './reader';
import { Practice } from './practice';
import { Literature } from './literature';
import { isHamletEntry } from './hamlet';
import { literaryWorks, chapterReadingCases } from './literature-meta';
import episodes from './literature-data.json';
import editorial from './editorial.json';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';

const doors = [
  { word: '真', sub: '所是 · 所见', title: '先让世界成为它自己', text: '分清事实、感受、解释与判断。不要求世界迁就自己，也不允许世界取消自己。', note: '事实能说出世界是什么，不能独自回答什么值得。', tags: ['四本账', '三层速度', '诚实可纠'] },
  { word: '情', sub: '所爱', title: '先爱生命，再找意义', text: '看见具体的人与事，辨认真正珍惜的东西。把生命用于建设，也给生活留下宽度。', note: '先爱生命，是邀请，不是要求；暂时爱不动的人，也在其中。', tags: ['所爱与欲望', '建设而非证明', '有结构的幸福'] },
  { word: '苦', sub: '所受', title: '苦不算总账', text: '不把受难洗成理所当然，也不把受苦当成功绩。眼前有人，就从能做的照料开始。', note: '人可以从苦里学到东西，不必因此感谢苦本身。', tags: ['不替伤害销账', '照料', '认领与改道'] },
  { word: '手', sub: '所择 · 所为', title: '拒绝给出边界，行动给出存在', text: '在取舍中形成轮廓，用能承担的小行动接触现实。保护底盘，留住回来与重新开始的路。', note: '对事实忠实，对形式自由。', tags: ['退步', '小而可逆', '成形与显形'] },
  { word: '人', sub: '共生', title: '有自己的墙，也有自己的门', text: '人格平等，权限分级。在关系里保留判断、尊重拒绝，也承担有来处、有分寸的责任。', note: '不做乐器，也不把人当乐器。', tags: ['主体地位', '边界与照料', '彼此成林'] },
  { word: '时', sub: '所成', title: '时间把行动写回行动者', text: '反复的选择慢慢沉成河床。回头辨认：哪些值得加深，哪些需要改道。', note: '时间使其成形，认领使其属己。', tags: ['河床', '认领', '代谢与停下'] },
];

export default function Home() {
  const [view, setView] = useState('ground');
  const [door, setDoor] = useState(0);
  const [chapter, setChapter] = useState(0);
  const [paragraph, setParagraph] = useState<number|null>(null);
  const [literaryWork,setLiteraryWork] = useState('kara');
  const [episode,setEpisode] = useState('kara-leaves-and-tears');
  const selected = doors[door];
  const read = (id: number, target?:number) => { setChapter(id); setParagraph(target??null); setView('read'); window.scrollTo({ top: 0 }); };
  const navigate = (v:string) => { setView(v); window.scrollTo({top:0}); };
  const openLiterature = (work:string,id?:string) => {
    const validWork=literaryWorks.some(w=>w.id===work)?work:'kara';
    const entry=episodes.find(e=>e.workId===validWork&&e.id===id)??episodes.find(e=>e.workId===validWork)!;
    const sameWork=view==='literature'&&literaryWork===validWork;
    setLiteraryWork(validWork);setEpisode(validWork==='hamlet'&&id&&isHamletEntry(id)?id:entry.id);setView('literature');
    if(!sameWork)window.scrollTo({top:0});
    else requestAnimationFrame(()=>document.querySelector(validWork==='hamlet'?'.hamlet-mode-tabs':'.literary-workspace')?.scrollIntoView({block:'start'}));
  };
  useFrameworkTool((section,id)=>{if(section==='read')read(id??0);else navigate(section);});
  useEffect(()=>{const section=window.location.hash.slice(1);if(['ground','map','practice','literature'].includes(section))setView(section);const match=window.location.hash.match(/^#read-(\d+)(?:-(\d+))?$/);if(match&&Number(match[1])<9){setChapter(Number(match[1]));setParagraph(match[2]?Number(match[2]):null);setView('read');}const literaryMatch=section.match(/^literature-(kara|war|red|poem|hamlet)(?:--(.+))?$/);if(literaryMatch)openLiterature(literaryMatch[1],literaryMatch[2]);},[]);
  useEffect(()=>{history.replaceState(null,'', view==='read'?`#read-${chapter}${paragraph!==null?`-${paragraph}`:''}`:view==='literature'?`#literature-${literaryWork}--${episode}`:`#${view}`);},[view,chapter,paragraph,literaryWork,episode]);
  return <Tabs value={view} onValueChange={v => navigate(String(v))} className="site-shell">
    <a className="skip-link" href="#main-content">跳至内容</a>
    <header className="site-header">
      <button className="brand" onClick={() => setView('ground')} aria-label="自成其形，返回哲学底座"><span className="seal">形</span><span>自成其形<small>在真实中，把生命长成自己的样子</small></span></button>
      <TabsList className="main-nav" variant="line" aria-label="阅读方式"><TabsTrigger value="ground">哲学底座</TabsTrigger><TabsTrigger value="literature">阅读互照</TabsTrigger><TabsTrigger value="map">体系地图</TabsTrigger><TabsTrigger value="read">原文阅读</TabsTrigger><TabsTrigger value="practice">四问练习</TabsTrigger></TabsList>
      <span className="edition">阅读修订稿 <span>·</span> 交互读本</span>
    </header>
    <main id="main-content" className="main-content">
      <TabsContent value="ground"><Ground read={read} explore={()=>{setView('map');window.scrollTo({top:0});}} literature={openLiterature}/></TabsContent>
      <TabsContent value="literature"><Literature workId={literaryWork} episodeId={episode} open={openLiterature} read={read}/></TabsContent>
      <TabsContent value="map" className="map-view">
        <div className="section-heading"><div><p className="eyebrow">A MAP FOR BECOMING</p><h1>六扇门，一座园子。</h1></div><p className="heading-note">这不是六道工序。生活里，它们同时在场。<br/>从此刻与你有关的一扇门进入。</p></div>
        <div className="map-layout">
          <div className="diagram-panel"><img className="map-water" src="./river.webp" alt="" aria-hidden="true" width="1536" height="1024" loading="lazy"/><div className="orbit-caption"><span className="tiny-dot"/> 点击一扇门，展开它的含义 <MoveUpRight size={15}/></div>
            <div className="orbit">
              <svg className="orbit-lines" viewBox="0 0 600 560" fill="none" aria-hidden="true"><circle cx="300" cy="280" r="196" stroke="currentColor"/><circle cx="300" cy="280" r="148" stroke="currentColor" strokeDasharray="2 7"/><path d="M300 84L470 182L470 378L300 476L130 378L130 182Z" stroke="currentColor" opacity=".3"/><path d="M306 77l7 8-10 5M475 371l-1 11-11-3M133 188l-2-11 11-1" stroke="var(--red)" strokeWidth="1.5"/></svg>
              <div className="orbit-center"><span>世界有其所是 · 人有其自身</span><strong>自成<br/>其形<span className="center-dot">。</span></strong><p>沉积与认领的合作</p></div>
              {doors.map((d, i) => <button key={d.word} className={`door door-${i} ${door === i ? 'active' : ''}`} onClick={() => setDoor(i)} aria-pressed={door === i} aria-label={`${d.word}：${d.sub}`}><span className="door-word">{d.word}</span><span className="door-sub">{d.sub}</span></button>)}
            </div><p className="map-footnote"><span>循环，而非直线</span>时间会回头改写所见与所爱。</p>
          </div>
          <article className="door-detail" key={door} aria-live="polite"><div className="detail-top"><span>六扇门 / {String(door + 1).padStart(2, '0')}</span><span>{selected.sub}</span></div><div className="door-display">{selected.word}<span>↗</span></div><h2>{selected.title}</h2><p className="detail-description">{selected.text}</p><div className="concept-tags">{selected.tags.map(t => <span key={t}>{t}</span>)}</div><blockquote>{selected.note}</blockquote><button className="text-link" onClick={() => read(door + 1)}>进入「{selected.word}」的原文 <ArrowUpRight size={18}/></button><button className="text-link map-reading-link" onClick={()=>{const e=episodes.find(x=>x.id===chapterReadingCases[door+1][0])!;openLiterature(e.workId,e.id);}}>从作品情境理解这一章 <ArrowUpRight size={18}/></button><span className="editorial-label">本卡为导读归纳 · 原文可逐章阅读</span></article>
        </div>
        <div className="foundations"><div className="foundation-label"><span>园子的边界</span><h2>墙为人修。</h2></div><button onClick={() => read(0)}><span className="foundation-index">01 / 底线</span><strong>不骗自己</strong><p>与现实保持连接，让判断能够修正。</p><ArrowUpRight size={19}/></button><button onClick={() => read(4)}><span className="foundation-index">02 / 底线</span><strong>不吃人</strong><p>不把具体的人，变成可以交换的代价。</p><ArrowUpRight size={19}/></button><button className="garden-link" onClick={() => read(7)}><span className="foundation-index">墙内 / 生活</span><strong>园中有一个不修的角落</strong><p>留白本身，就是园子存在的理由。</p><ArrowUpRight size={19}/></button></div>
        <section className="map-relations"><div className="section-heading"><div><p className="eyebrow">相互回写 / 编辑导读</p><h2>一扇门，总通向别处。</h2></div></div><div className="relation-grid">{editorial.relationships.links?.filter(e=>e.from===['truth','affection','suffering','action','people','time'][door]||e.to===['truth','affection','suffering','action','people','time'][door]).map((e,i)=><p key={i}><span>{({truth:'真',affection:'情',suffering:'苦',action:'手',people:'人',time:'时'} as Record<string,string>)[e.from]} ↔ {({truth:'真',affection:'情',suffering:'苦',action:'手',people:'人',time:'时'} as Record<string,string>)[e.to]}</span>{e.text}</p>)}</div></section>
        <section className="misconceptions"><h2>几个值得辨清的地方</h2><Accordion>{editorial.misconceptions.map((m,i)=><AccordionItem value={String(i)} key={m.title}><AccordionTrigger>{m.title}</AccordionTrigger><AccordionContent><p>{m.correction}</p><button className="subtle-link" onClick={()=>read(content.chapters.findIndex(c=>c.paragraphs.some(p=>p.index===m.sourceIndices[0])),m.sourceIndices[0])}>回到原文核对 <ArrowUpRight size={16}/></button></AccordionContent></AccordionItem>)}</Accordion><p className="editorial-label">以上为编辑归纳；判断仍以原文及你的理解为准。</p></section>
      </TabsContent>
      <TabsContent value="read"><Reader chapter={chapter} paragraph={paragraph} read={read} practice={()=>navigate('practice')} literature={openLiterature}/></TabsContent>
      <TabsContent value="practice" keepMounted><Practice read={read} close={()=>navigate('ground')}/></TabsContent>
    </main><footer className="site-footer"><span>自成其形 <span className="footer-divider">/</span> 阅读 · 理解 · 实践</span><span className="image-attribution">图像为 AI（人工智能）生成的文本意象</span><span>结构可以借，结论不能抄。</span></footer>
  </Tabs>;
}
