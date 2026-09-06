import { ArrowDown, ArrowRight, Undo2 } from 'lucide-react';
export function StudyFigure({id}:{id:string}) {
 if(id==='truth-four-ledgers')return <figure className="study-figure ledger-figure"><figcaption>一件事，分开四种陈述 <span>编辑图解 · 情境示例</span></figcaption><div className="ledger-grid">{[
  ['事实','能观察、能核验','消息发出一天，尚未收到回复。'],
  ['感受','真实发生的反应','我感到不安。'],
  ['解释','尚待核验的理解','我猜，对方可能不重视我。'],
  ['判断','当前根据下的结论','依据还不够，先不认定对方的动机。'],
 ].map(([label,description,example])=><div key={label}><strong>{label}</strong><span>{description}</span><p>{example}</p></div>)}</div><p className="figure-footnote">感受真实发生，关于原因的解释仍可能出错。四本账里，没有人格总账。</p></figure>;
 if(id==='truth-speeds-and-support')return <figure className="study-figure time-layers"><figcaption>把观察的时间拉开 <span>编辑图解</span></figcaption>{[
  ['不变层','千年尺度','身体的限度，反复出现的倾向'],
  ['慢变层','十年尺度','能力、作品、信用与关系的积累'],
  ['快变层','日月尺度','工具、热点、价格、情绪与评价'],
 ].map(([title,scale,description],i)=><div key={title} className={`time-layer layer-${i}`}><span>{scale}</span><strong>{title}</strong><p>{description}</p></div>)}<p className="figure-footnote">这些是观察刻度，不是固定寿命；各层的归属仍须随证据校准。</p></figure>;
 if(id==='action-choice-and-arrangement')return <figure className="study-figure allocation-figure"><figcaption>减法，要切准部位 <span>编辑图解</span></figcaption><div className="allocation-grid"><div><span>阶段性的工作中心</span><h3>锋刃</h3><strong>集中 · 排位</strong><p>有限的注意与资源，放在此时最值得建设的地方。</p></div><div><span>能够回来与重新开始的条件</span><h3>底盘</h3><strong>支持 · 冗余</strong><p>健康、生计、信用、重要关系与拒绝权，需要留余地。</p></div></div><p className="figure-footnote">多数所爱不必被删除，可以被安放；排后的不得长期吞噬排前的。</p></figure>;
 if(id==='time-sediment')return <figure className="study-figure sediment-figure"><figcaption>时间如何把行动写回来 <span>编辑图解</span></figcaption><div className="sediment-flow"><span>选择</span><ArrowRight/><span>行动</span><ArrowRight/><span>反馈</span></div><div className="sediment-down"><ArrowDown size={19}/><span>反复之后，可能留下</span></div><div className="sediment-deposits"><span><strong>内在倾向</strong>习惯、注意与判断</span><span><strong>外部资产</strong>作品、技能与信用</span><span><strong>未来分布</strong>看见、遇见与承接的可能</span></div><div className="sediment-return"><Undo2 size={19}/><p>已有的河床，回头影响下一轮的所见、所爱与行动。</p></div><p className="figure-footnote">沉积不自动等于进步。环境、他人和运气也参与其中，旧河道仍可以重估。</p></figure>;
 if(id==='people-walls-and-doors')return <figure className="study-figure relationship-figure"><figcaption>同样尊重，不等于同样靠近 <span>编辑图解</span></figcaption><div className="relationship-line"><div><strong>主体地位</strong><span>不以能力与回报为条件</span></div><div><strong>信任与靠近</strong><span>由长期模式与双方愿意形成</span></div><div><strong>责任与承诺</strong><span>有来处、有分寸，也要有支持</span></div></div><p className="figure-footnote">爱是可以自己打开的门；已经承担的具体责任，不能只交给心情。</p></figure>;
 if(id==='affection-happiness-structure')return <figure className="study-figure happiness-figure"><figcaption>常态次序，照看整体构图 <span>编辑图解</span></figcaption><div className="happiness-priorities"><span><small>第一</small><strong>健康</strong></span><ArrowRight size={18}/><span><small>第二</small><strong>自由</strong></span><ArrowRight size={18}/><span><small>第三</small><strong>财富与地位</strong></span></div><p className="figure-footnote">后者不得长期吞噬前者。这是保护生活条件的次序，不是幸福本身，也不是三选一。</p></figure>;
 return null;
}
