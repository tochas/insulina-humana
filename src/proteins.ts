import {insulin} from './data/insulin';
import type {ProteinConfig} from './types';
export {insulin};
export const enabledProteins:ProteinConfig[]=[insulin];
export const rooms=[insulin,...[2,3,4].map(n=>({id:`pending-${n}`,name:'Próxima proteína',enabled:false}))];
export const collectionSettings={totalTourMinutes:6,officialRubric:null as null|string,criteria:[] as string[]};
export const aminoAcids:Record<string,[string,string]>={G:['Gly','Glicina'],I:['Ile','Isoleucina'],V:['Val','Valina'],E:['Glu','Glutamato'],Q:['Gln','Glutamina'],C:['Cys','Cisteína'],T:['Thr','Treonina'],S:['Ser','Serina'],L:['Leu','Leucina'],Y:['Tyr','Tirosina'],N:['Asn','Asparagina'],F:['Phe','Fenilalanina'],H:['His','Histidina'],A:['Ala','Alanina'],R:['Arg','Arginina'],P:['Pro','Prolina'],K:['Lys','Lisina'],D:['Asp','Aspartato'],M:['Met','Metionina'],W:['Trp','Triptófano']};
