import type {ProteinConfig,ResidueId,Organization} from './types';
export const buttonMap:Record<number,string>={0:'confirm',1:'back',2:'labels',3:'organization',4:'previousRepresentation',5:'nextRepresentation',8:'reset',9:'pause',12:'previousOption',13:'nextOption',14:'previousStation',15:'nextStation'};
export const clamp=(n:number,min:number,max:number)=>Math.max(min,Math.min(max,n));
export function deadzone(value:number,threshold=.16){const v=clamp(value,-1,1);return Math.abs(v)<=threshold?0:Math.sign(v)*(Math.abs(v)-threshold)/(1-threshold);}
export function smooth(previous:number,target:number,dt:number){return previous+(target-previous)*(1-Math.exp(-12*dt));}
export function parseResidue(id:string){const match=/^([A-Za-z]+)(\d+)$/.exec(id);return match?{chain:match[1],resi:Number(match[2])}:null;}
export function validResidue(config:ProteinConfig,id:string){const r=parseResidue(id),c=config.chains.find(c=>c.id===r?.chain);return !!r&&!!c&&r.resi>=1&&r.resi<=c.sequence.length;}
export const bridgeKey=(a:string,b:string)=>[a,b].sort().join('–');
export function connectBridge(config:ProteinConfig,done:string[],a:ResidueId,b:ResidueId){
 const key=bridgeKey(a,b); if(a===b)return {status:'same',done};
 if(done.includes(key))return {status:'duplicate',done};
 if(!config.bridges.some(([x,y])=>bridgeKey(x,y)===key))return {status:'wrong',done};
 const next=[...done,key];return {status:next.length===config.bridges.length?'complete':'correct',done:next};
}
export function toggleOrganization(o:Organization):Organization{return o==='hexamer'?'monomer':'hexamer';}
export function tourIndex(elapsedMs:number,durationSeconds:number,count:number){return Math.floor((elapsedMs%(durationSeconds*1000))/(durationSeconds*1000/count));}
export const shouldAttract=(now:number,last:number,idleSeconds:number,paused:boolean)=>!paused&&now-last>=idleSeconds*1000;
export function validateProtein(p:ProteinConfig){const errors:string[]=[];if(!p.id||!p.name||!p.species||!p.pdb)errors.push('Falta identidad');if(!p.chains.length||p.chains.some(c=>!c.sequence||!/^[ACDEFGHIKLMNPQRSTVWY]+$/.test(c.sequence)))errors.push('Secuencia inválida');for(const [a,b] of p.bridges)if(!validResidue(p,a)||!validResidue(p,b))errors.push(`Puente inválido ${a}–${b}`);if(!p.models.monomer||!p.stations.length||!p.sources.length)errors.push('Faltan modelo, estaciones o fuentes');if(p.tour.durationSeconds<=0||p.tour.idleSeconds<0)errors.push('Temporizador inválido');return errors;}
export async function missingResources(paths:string[],fetcher:typeof fetch=fetch){const result=await Promise.all(paths.map(async path=>{try{const r=await fetcher(path,{method:'HEAD'});return r.ok?null:path;}catch{return path;}}));return result.filter((v):v is string=>!!v);}
export function roleForChain(chain:string){return 'ACEGIK'.includes(chain)?'A':'B';}
export class MuseumClock {
 last=0; start:number|null=null; paused=false; permanent=false;
 constructor(public duration=77,public idle=20){}
 interact(now:number){this.last=now;this.start=null;}
 tick(now:number,count:number){if(this.paused)return -1;if(this.start===null&&shouldAttract(now,this.last,this.idle,false))this.start=now;return this.start===null?-1:tourIndex(now-this.start,this.duration,count);}
}
