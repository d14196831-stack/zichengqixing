'use client';
import { useEffect } from 'react';
import { flushSync } from 'react-dom';

type ModelTool = {name:string;title:string;description:string;inputSchema:object;annotations:{readOnlyHint:boolean;untrustedContentHint:boolean};execute:(input:unknown)=>unknown};
type ToolDocument = Document & {modelContext?:{registerTool:(tool:ModelTool,options:{signal:AbortSignal})=>void|Promise<void>}};
export function useFrameworkTool(navigate:(section:string,chapter?:number)=>void) {
 useEffect(()=>{
  const context=(document as ToolDocument).modelContext;
  if(!context?.registerTool)return;
  const lifetime=new AbortController();
  try { void Promise.resolve(context.registerTool({
   name:'open_framework_section',title:'打开自成其形阅读内容',description:'打开哲学底座、阅读互照、体系地图、四问练习，或指定章节原文。只导航，不填写或读取私人书写。',
   inputSchema:{type:'object',properties:{section:{type:'string',enum:['ground','literature','map','read','practice']},chapter:{type:'integer',minimum:0,maximum:8}},required:['section'],additionalProperties:false},
   annotations:{readOnlyHint:false,untrustedContentHint:false},
   execute(input){
    if(!input||typeof input!=='object')throw new Error('Expected an object');
    const x=input as Record<string,unknown>;
    if(Object.keys(x).some(k=>k!=='section'&&k!=='chapter')||typeof x.section!=='string'||!['ground','literature','map','read','practice'].includes(x.section))throw new Error('Invalid section');
    if(x.chapter!==undefined&&(!Number.isInteger(x.chapter)||Number(x.chapter)<0||Number(x.chapter)>8))throw new Error('Invalid chapter');
    const section=x.section;const chapter=Number(x.chapter??0);
    flushSync(()=>navigate(section,chapter));
    return {section,...(section==='read'?{chapter}:{}),status:'opened'};
   }
  },{signal:lifetime.signal})).catch(()=>{}); } catch {}
  return ()=>lifetime.abort();
 },[]);
}
