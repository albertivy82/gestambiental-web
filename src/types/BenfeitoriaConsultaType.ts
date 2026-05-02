import { DadosType } from "./DadosType";

export interface BenfeitoriaConsultaType {

  tipoBenfeitoria: DadosType[];
  funcao: DadosType[];
  impermeabilizacaoSolo: DadosType[];
  limites: DadosType[];
  area: DadosType[];
  paredes: DadosType[];
  tipoCobertura: DadosType[];
  tipoEsquadrias: DadosType[];
  origemMadeiraConstrucao: DadosType[];
  origemPedraConstrucao: DadosType[];
  origemAreiaConstrucao: DadosType[];
  alagamentos: DadosType[];
  epocaAlagamento: DadosType[];
  efluentes: DadosType[];
  residuos: DadosType[];
  fonteEnergia: DadosType[];
  energiaAlimentos: DadosType[];
  meioLocomocao: DadosType[];
  meioComunicacao: DadosType[];
}