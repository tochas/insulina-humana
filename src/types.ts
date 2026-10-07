export type Organization = 'monomer' | 'dimer' | 'hexamer';
export type Representation = 'cartoon' | 'sticks' | 'surface' | 'combined' | 'bridges';
export type ResidueId = `${string}${number}`;
export interface Source { id:string; title:string; url:string; evidence:string }
export interface Station { id:string; title:string; kicker:string; text:string; detail:string; sources:string[]; focus?:string; organization?:Organization; audio?:string }
export interface ProteinConfig {
 id:string; name:string; species:string; type:string; enabled:boolean; pdb:string;
 models:Record<Organization,string>; assembly:number; chains:{id:string;sequence:string;color:string}[];
 chainRoles?:Record<string,string>; secondaryAnnotations?:{chains:string[];from:number;to:number;type:'h'|'s'|'c'}[];
 levels:{id:string;title:string;text:string; applicable:boolean;selection:string[]}[];
 bridges:[ResidueId,ResidueId][]; regions:{name:string;residues:ResidueId[];meaning:string;source:string}[];
 functionalGroups:{name:string;residues:ResidueId[];text:string}[];
 function:string; interactions:string[]; application:{name:string;steps:{title:string;text:string;icon:string}[];sourceIds:string[]};
 stations:Station[]; questions:{q:string;answers:string[];correct:number;explanation:string}[];
 activities:{id:string;kind:'bridges'|'organization'|'pathway';title:string}[];
 audios:Record<string,{text:string;file:string}>; tour:{durationSeconds:number;idleSeconds:number;steps:{station:number;label:string;organization?:Organization;focus?:string}[]};
 sources:Source[]; printedSheet?:string; digitalSheetUrl?:string; evaluationCriteria?:string[];
}
