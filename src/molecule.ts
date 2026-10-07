import type {ProteinConfig,Organization,Representation,ResidueId} from './types';
import {parseResidue,bridgeKey} from './core';
declare const $3Dmol:any;
export class Molecule {
 viewer:any; model:any; organization:Organization='monomer'; representation:Representation='combined';
 selected:ResidueId|null=null; selectedChain:string|null=null; focus=''; labels=true; reduced=false; separated=false; completed:string[]=[];
 private cache:Partial<Record<Organization,string>>={}; private loadVersion=0; private styleVersion=0; private initialView:number[]=[]; private motionFrame=0;
 onSelect:(id:ResidueId,displayChain:string)=>void=()=>{};
 constructor(public element:HTMLElement,public config:ProteinConfig){
  this.viewer=$3Dmol.createViewer(element,{backgroundColor:'#080e21',backgroundAlpha:0,antialias:true});
  this.viewer.setZoomLimits(12,240);
  element.addEventListener('pointerdown',()=>this.cancelMotion(),{passive:true});element.addEventListener('wheel',()=>this.cancelMotion(),{passive:true});
  new ResizeObserver(()=>this.viewer.resize()).observe(element);
 }
 async load(organization:Organization='monomer',preserve=true){
  this.cancelMotion();const version=++this.loadVersion;const old=this.model?this.viewer.getView():null;
  if(!this.cache[organization]){const r=await fetch(this.config.models[organization]);if(!r.ok)throw Error(`No se encuentra ${this.config.models[organization]}`);this.cache[organization]=await r.text();}
  if(version!==this.loadVersion)return;
  this.organization=organization; this.viewer.clear();
  this.model=this.viewer.addModel(this.cache[organization],'pdb',{keepH:false,keepAltLoc:'A'});
  const atoms=this.model.selectedAtoms({});
  // Secondary structure labels follow deposited HELIX/SHEET records, including the R-like chains.
  for(const atom of atoms){if(atom.hetflag)continue;
   if(this.config.secondaryAnnotations){atom.ss='c';for(const range of this.config.secondaryAnnotations)if(range.chains.includes(atom.chain)&&atom.resi>=range.from&&atom.resi<=range.to)atom.ss=range.type;}
   if(this.separated&&organization==='monomer')atom.x+=atom.chain==='A'?-9:9;
  }
  // Clickable residue atoms use actual coordinates. Replica chain is preserved in the label.
  this.viewer.setClickable({hetflag:false},true,(a:any)=>{const id=`${(this.config.chainRoles?.[a.chain]||a.chain)}${a.resi}` as ResidueId;this.selectedChain=a.chain;this.onSelect(id,a.chain);});
  this.applyStyle();this.viewer.zoomTo();this.viewer.zoom(this.organization==='hexamer'?1.12:this.organization==='dimer'?1.3:1.55);
  let view=this.viewer.getView();
  if(old&&preserve){for(let i=4;i<8;i++)view[i]=old[i];this.viewer.setView(view);}
  this.initialView=[...view];this.viewer.render();
  if(old&&!this.reduced)this.element.animate([{opacity:.25},{opacity:1}],{duration:420,easing:'ease-out'});
 }
 atoms(selection:any={}){return this.model?.selectedAtoms(selection)||[];}
 private selection(id:string){const r=parseResidue(id);return r?{chain:r.chain,resi:r.resi}:{};}
 applyStyle(){
  if(!this.model)return;const version=++this.styleVersion;const v=this.viewer;v.removeAllSurfaces();v.removeAllLabels();v.removeAllShapes();v.setStyle({},{});
  const focusing=!!this.focus||!!this.selected;
  for(const chain of new Set<string>(this.atoms({hetflag:false}).map((a:any)=>a.chain))){
   const role=(this.config.chainRoles?.[chain]||chain),color=this.config.chains.find(c=>c.id===role)?.color||'#769bff';
   const style:any={};const rep=this.representation;
   if(rep!=='sticks')style.cartoon={color:focusing?(role==='A'?'#285d57':'#34476c'):color,opacity:1,thickness:.55};
   if(rep==='sticks'||rep==='combined')style.stick={radius:rep==='sticks'?.13:.07,color,opacity:focusing?.3:.75};
   if(rep==='sticks')style.sphere={scale:.23,color};
   // CA spheres are small picking targets, visible in every representation.
   v.setStyle({chain,hetflag:false},style);v.addStyle({chain,atom:'CA',hetflag:false},{sphere:{radius:.24,color,opacity:.7}});
   if(rep==='surface')v.addSurface($3Dmol.SurfaceType.MS,{opacity:.38,color},{chain,hetflag:false}).then(()=>{if(version===this.styleVersion)v.render();});
  }
  const bright=(sel:any,color:string)=>v.addStyle(sel,{stick:{color,radius:.2},sphere:{color,scale:.28},cartoon:{color,opacity:1}});
  if(this.focus==='A'||this.focus==='B')for(const chain of new Set<string>(this.atoms({hetflag:false}).map((a:any)=>a.chain)))if((this.config.chainRoles?.[chain]||chain)===this.focus)bright({chain},this.config.chains.find(c=>c.id===this.focus)!.color);
  if(this.focus==='secondary')for(const chain of ['A','B'])v.addStyle({chain,ss:'h'},{cartoon:{color:chain==='A'?'#59e1bf':'#769bff',opacity:1}});
  if(this.focus==='receptor')for(const id of this.config.regions.flatMap(region=>region.residues))bright(this.selection(id),'#ffb8e2');
  const showBridges=this.representation==='bridges'||this.focus==='bridges'||this.separated||this.representation==='combined';
  if(showBridges){
   for(const [x,y] of this.config.bridges){
    const a=this.atoms({...this.selection(x),atom:'SG'})[0],b=this.atoms({...this.selection(y),atom:'SG'})[0];if(!a||!b)continue;
    bright(this.selection(x),'#f3cc78');bright(this.selection(y),'#f3cc78');
    if(!this.separated||this.completed.includes(bridgeKey(x,y)))v.addCylinder({start:a,end:b,radius:.15,color:'#f3cc78',fromCap:1,toCap:1});
   }
  }
  v.setStyle({resn:'ZN'},{sphere:{radius:1,color:'#e298ff'}});
  if(this.focus==='zinc'){
   for(const z of this.atoms({resn:'ZN'}))for(const h of this.atoms({resn:'HIS',atom:'NE2'})){
    const distance=Math.hypot(z.x-h.x,z.y-h.y,z.z-h.z);if(distance<2.7){bright({chain:h.chain,resi:h.resi},'#df9aff');v.addLine({start:z,end:h,color:'#e298ff',dashed:true});}
   }
  }
  if(this.selected){const r=parseResidue(this.selected)!;const chain=this.selectedChain||r.chain;bright({chain,resi:r.resi},'#ffffff');if(this.labels)this.addLabel(`${this.selected} · ${this.atoms({chain,resi:r.resi})[0]?.resn||''}${chain!==r.chain?' · copia '+chain:''}`,{chain,resi:r.resi,atom:'CA'});}
  if(this.labels){
   if(showBridges&&(this.focus==='bridges'||this.separated||this.representation==='bridges'))for(const id of ['A6','A7','A11','A20','B7','B19'])this.addLabel(id,{...this.selection(id),atom:'SG'},'#f3cc78');
   else if(this.focus==='zinc')this.atoms({resn:'ZN'}).forEach((a:any,i:number)=>v.addLabel(`Zn²⁺ ${i+1}`,{position:a,fontColor:'#efbbff',backgroundOpacity:.8,fontSize:16}));
   else {this.addLabel('Cadena A · 21 aa',{chain:'A',resi:1,atom:'CA'},'#59e1bf');this.addLabel('Cadena B · 30 aa',{chain:'B',resi:30,atom:'CA'},'#769bff');}
  }
  v.render();
 }
 addLabel(text:string,sel:any,color='#ffffff'){const a=this.atoms(sel)[0];if(a)this.viewer.addLabel(text,{position:a,fontColor:color,backgroundColor:'#101a33',backgroundOpacity:.85,fontSize:15,borderThickness:0,inFront:true});}
 cancelMotion(){cancelAnimationFrame(this.motionFrame);this.motionFrame=0;}
 private transition(action:()=>void,duration=600){this.cancelMotion();const from=this.viewer.getView();action();const to=this.viewer.getView();const rotating=from.slice(4,8).some((n:number,i:number)=>Math.abs(n-to[i+4])>.001);if(rotating&&from.slice(4,8).reduce((sum:number,n:number,i:number)=>sum+n*to[i+4],0)<0)for(let i=4;i<8;i++)to[i]*=-1;if(this.reduced||duration===0)return;this.viewer.setView(from);const start=performance.now();const step=(now:number)=>{const t=Math.min(1,(now-start)/duration),e=t*t*(3-2*t),view=this.viewer.getView();for(let i=0;i<4;i++)view[i]=from[i]+(to[i]-from[i])*e;if(rotating){for(let i=4;i<8;i++)view[i]=from[i]+(to[i]-from[i])*e;const len=Math.hypot(...view.slice(4,8));for(let i=4;i<8;i++)view[i]/=len;}this.viewer.setView(view);if(t<1)this.motionFrame=requestAnimationFrame(step);else this.motionFrame=0;};this.motionFrame=requestAnimationFrame(step);}
 select(id:ResidueId,chain?:string){this.selected=id;this.selectedChain=chain||parseResidue(id)!.chain;this.applyStyle();const r=parseResidue(id)!;this.transition(()=>this.viewer.zoomTo({chain:this.selectedChain,resi:[Math.max(1,r.resi-3),r.resi,r.resi+3]}));}
 focusRegion(focus:string,animate=true){this.focus=focus;this.selected=null;this.selectedChain=null;this.applyStyle();
  this.transition(()=>{if(focus==='zinc'){const current=this.viewer.getView();this.viewer.setView([...current.slice(0,4),0,0,0,1]);this.viewer.rotate(60,'x');this.viewer.rotate(25,'y');}if(focus==='A'||focus==='B')this.viewer.zoomTo({chain:focus});else{this.viewer.zoomTo();this.viewer.zoom(this.organization==='hexamer'?1.12:this.organization==='dimer'?1.3:1.55);}},animate?650:0);
 }
 setRepresentation(rep:Representation){this.representation=rep;this.applyStyle();}
 fit(scale=1.55){this.cancelMotion();this.viewer.zoomTo();this.viewer.zoom(scale);this.initialView=[...this.viewer.getView()];}
 reset(){this.cancelMotion();this.viewer.setView([...this.initialView,0,0]);this.viewer.render();}
 rotate(x:number,y:number,cancel=true){if(cancel)this.cancelMotion();this.viewer.rotate(x,'y');this.viewer.rotate(y,'x');}
 pan(x:number,y:number){this.cancelMotion();this.viewer.translateScene(x,y);}
 zoom(factor:number){this.cancelMotion();this.viewer.zoom(factor);}
 dispose(){this.cancelMotion();this.viewer.clear();this.element.innerHTML='';}
}
