import { toPng } from "html-to-image";
import { useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import logo from "../assets/images/logo_2.png";
import GraficoBarra from "../shared/components/graphics/GraficoBarra";
import GraficoPizza from "../shared/components/graphics/GraficoPizza";
import TabelaDados from "../shared/components/graphics/TabelaDados";
import Text from "../shared/components/text/Text";
import { textTypes } from "../shared/components/text/textTypes";
import { theme } from "../shared/themes/theme";
import { useLocalidade } from "./hooks/useLocalidade";
import { useMorador } from "./hooks/useMorador";
import { useParticipacao } from "./hooks/useParticipacao";
import { useAtividadeProdutiva } from "./hooks/useAtividadeProdutiva";
import { useServicosComunicacao } from "./hooks/useServicosComunicacao";
import { useOutrasRendas } from "./hooks/useOutrasRendas";
import { useCredito } from "./hooks/useCredito";
import { useAgua } from "./hooks/useAgua";
import { useBenfeitoria } from "./hooks/useBenfeitoria";
import { useImovel } from "./hooks/useImovel";
import { useEntrevistado } from "./hooks/useEntrevistado";
import { usePosto } from "./hooks/usePostos";
import { useEscola } from "./hooks/usePostos copy";


export default function Dados() {
  const navigate = useNavigate();
  const { id } = useParams();
  const {localidade, loading: loadingLocalidade, error: errorLocalidade} = useLocalidade(Number(id));
  const {dadosMorador} = useMorador(Number(id));
  const {participacao} = useParticipacao(Number(id));
  const {atividadeProdutiva} = useAtividadeProdutiva(Number(id));
  const {servicosComunicacao} = useServicosComunicacao(Number(id));
  const {outrasRendas} = useOutrasRendas(Number(id));
  const {credito} = useCredito(Number(id));
  const {agua} = useAgua(Number(id));
  const {benfeitoria} = useBenfeitoria(Number(id));
  const {imovel} = useImovel(Number(id));
  const {dadosEntrevistado} = useEntrevistado(Number(id));
  const {dadosPosto} = usePosto(Number(id));
  const {dadosEscola} = useEscola(Number(id));
  
  const ref = useRef<HTMLDivElement>(null);
  
  
  if (loadingLocalidade ) return <div>Carregando dados...</div>;
  if (errorLocalidade) return <div>Erro da localidade: {errorLocalidade}</div>;
 

  const exportarImagem = async () => {
    if (!ref.current) return;
  
    const dataUrl = await toPng(ref.current);
  
    const link = document.createElement("a");
    link.download = "grafico.png";
    link.href = dataUrl;
    link.click();
  };
   

  return (
  <div style={styles.container}>
        <div style={styles.header}>
              <img src={logo} alt="Logo" style={styles.logo} />
              <Text
                type={textTypes.TITLE_BOLD}
                color={theme.colors.redTheme.red3}
                style={{ textAlign: "center" }}
                  >LOCALIDADE ATUAL
               </Text>
               <Text
                type={textTypes.TITLE_BOLD}
                color={theme.colors.redTheme.red3}
                style={{ textAlign: "center" }}
                  >{localidade?.nome}
               </Text>
        </div>   
          
        <div style={styles.temas}>
               <Text
                type={textTypes.TITLE_BOLD}
                color={theme.colors.mainTheme.black}
                style={{ textAlign: "left" }}>
                    Dados do Entrevistado
                </Text>
         </div>    
    
        <GraficoPizza
           title="Moradores - Sexo"
          data={dadosMorador?.sexo}
          onDownload={exportarImagem}
        />

        <GraficoPizza
           title="Moradores - Escolaridade"
          data={dadosMorador?.escolaridade}
          onDownload={exportarImagem}
        />

        <GraficoPizza
           title="Moradores - Religião"
          data={dadosMorador?.religiao}
          onDownload={exportarImagem}
        />

         <GraficoBarra
           title="Moradores - Estado Civil"
          data={dadosMorador?.estadoCivil}
          onDownload={exportarImagem}
        />

         <GraficoBarra
           title="Moradores - Faixa Etária"
          data={dadosMorador?.faixaEtaria}
          onDownload={exportarImagem}
        />
         
         <GraficoBarra
           title="Moradores - Casos de Doenças Relatados"
          data={dadosMorador?.doencas}
          onDownload={exportarImagem}
        />

         <GraficoPizza
           title="Moradores - Estudantes"
          data={dadosMorador?.estudo}
          onDownload={exportarImagem}
        />

       <TabelaDados
           title="Moradores - Onde Estudam"
          data={dadosMorador?.detalheEstudo}
        />

       <GraficoPizza
           title="Moradores - Trabalho"
          data={dadosMorador?.trabalho}
          onDownload={exportarImagem}
        />

       <TabelaDados
           title="Moradores - Onde trabalha"
          data={dadosMorador?.detalheTrabalho}
        />

        
        <GraficoBarra
           title="Participacao Institucional de Moradores"
          data={participacao}
          onDownload={exportarImagem}
        />

        <GraficoBarra
           title="Atividades Produtivas dos Moradores"
          data={atividadeProdutiva?.atividades}
          onDownload={exportarImagem}
        />

        <GraficoBarra
           title="Atividade Produtiva - Faturamento Mensal (Em R$)"
          data={atividadeProdutiva?.faturamento}
          onDownload={exportarImagem}
        />

        <GraficoPizza
           title="Pessoas Envolvidas por Atividade Produtiva"
          data={atividadeProdutiva?.pessoasEnvolvidas}
          onDownload={exportarImagem}
        />


        <GraficoBarra
           title="Outras Fontes de Renda dos Moradores"
          data={outrasRendas?.fonte}
          onDownload={exportarImagem}
        />

        <GraficoBarra
           title="Beneficiário de Outras Fontes de renda"
          data={outrasRendas?.beneficiarios}
          onDownload={exportarImagem}
        />

        <GraficoPizza
           title="Outras Fontes de Renda - Faturamento Mensal (Em R$)"
          data={outrasRendas?.rendaMesTotal}
          onDownload={exportarImagem}
        />

       
       <GraficoPizza
           title="Serviços de Comunicação Utilizados"
          data={servicosComunicacao}
          onDownload={exportarImagem}
        />

      <GraficoPizza
           title="Fontes de Crédito acesada por moradores Locais"
          data={credito}
          onDownload={exportarImagem}
        />

        <GraficoPizza
              title="Agua- Fornecimento"
              data={agua?.tipoDeFornecimento}
              onDownload={exportarImagem}
            />

        <GraficoPizza
              title="Agua- Método de Tratamento"
              data={agua?.metodoTratamento}
              onDownload={exportarImagem}
        />

        <GraficoPizza
                title="Poço - Profundidade"
                data={agua?.profundidadePoco}
                onDownload={exportarImagem}
        />

        <GraficoPizza
                title="Agua - Qualidade da Água"
                data={agua?.qualidadeDaAgua}
                onDownload={exportarImagem}
              />

        <GraficoPizza
                title="Agua - Coloração da Água"
                data={agua?.corDagua}
                onDownload={exportarImagem}
              />

        <GraficoPizza
                title="Agua - Sabor da Água"
                data={agua?.saborDagua}
                onDownload={exportarImagem}
              />

        <GraficoPizza
                title="Agua - Cheiro da Água"
                data={agua?.cheiroDagua}
                onDownload={exportarImagem}
        />


      <GraficoPizza
                title="Benfeitorias - Finalidade das construções locais"
                data={benfeitoria?.tipoBenfeitoria}
                onDownload={exportarImagem}
      />

     

      <GraficoPizza
                title="Benfeitorias - Finalidade das construções locais"
                data={benfeitoria?.funcao}
                onDownload={exportarImagem}
      />

      <GraficoPizza
                title="Benfeitorias - impermeabilização do solo das construções"
                data={benfeitoria?.impermeabilizacaoSolo}
                onDownload={exportarImagem}
      />

      <GraficoPizza
                title="Benfeitorias - Tipo de Limite das Construções"
                data={benfeitoria?.limites}
                onDownload={exportarImagem}
      />

      <GraficoPizza
                title="Benfeitorias - Área das construções"
                data={benfeitoria?.area}
                onDownload={exportarImagem}
      />

      <GraficoPizza
                title="Benfeitorias - Material das paredes"
                data={benfeitoria?.paredes}
                onDownload={exportarImagem}
      />

      <GraficoPizza
                title="Benfeitorias - Material da cobertura"
                data={benfeitoria?.tipoCobertura}
                onDownload={exportarImagem}
      />


      <GraficoPizza
                title="Benfeitorias - Material das Esquadrias"
                data={benfeitoria?.tipoEsquadrias}
                onDownload={exportarImagem}
      />

      <GraficoPizza
                title="Benfeitorias - Origem da areia utilizada na construção"
                data={benfeitoria?.origemAreiaConstrucao}
                onDownload={exportarImagem}
      />
      <GraficoPizza
                title="Benfeitorias - Origem da madeira utilizada na construção"
                data={benfeitoria?.origemMadeiraConstrucao}
                onDownload={exportarImagem}
      />

          <GraficoPizza
                    title="Benfeitorias - Origem da pedra utilizada na construção"
                    data={benfeitoria?.origemPedraConstrucao}
                    onDownload={exportarImagem}
          />

          <GraficoPizza
                    title="Alagamentos da Área"
                    data={benfeitoria?.alagamentos}
                    onDownload={exportarImagem}
          />

          <GraficoPizza
                    title="Ocorrência de Alagamentos"
                    data={benfeitoria?.epocaAlagamento}
                    onDownload={exportarImagem}
          />

         <GraficoPizza
                    title="Efluêntes"
                    data={benfeitoria?.efluentes}
                    onDownload={exportarImagem}
          />

          
          <GraficoPizza
                    title="Descarte de Resíduos"
                    data={benfeitoria?.residuos}
                    onDownload={exportarImagem}
          />

          <GraficoPizza
                    title="Fonte de Energia"
                    data={benfeitoria?.fonteEnergia}
                    onDownload={exportarImagem}
          />

          <GraficoPizza
                    title="Energia Utilizada para Preparação de Alimentos"
                    data={benfeitoria?.energiaAlimentos}
                    onDownload={exportarImagem}
          />

          <GraficoPizza
                    title="Meio de Locomoção mais Utilizado"
                    data={benfeitoria?.meioLocomocao}
                    onDownload={exportarImagem}
          />

          <GraficoPizza
                    title="Meio de Informativo Mais utilizado"
                    data={benfeitoria?.meioComunicacao}
                    onDownload={exportarImagem}
          />

          

          <GraficoPizza 
                  title="Benfeitorias por Imóvel" 
                  data={imovel?.benfeitoriasPorImovel} 
                  onDownload={exportarImagem} />
          
          <GraficoPizza 
                  title="Área" 
                  data={imovel?.area} 
                  onDownload={exportarImagem} />
          
          <GraficoPizza 
                  title="Tipo de Solo" 
                  data={imovel?.tipoSolo} 
                  onDownload={exportarImagem} />
         
          <GraficoBarra 
                  title="Vizinhos Confinantes" 
                  data={imovel?.vizinhosConfinantes} 
                  onDownload={exportarImagem} />
          
          <GraficoPizza 
                  title="Situação Fundiária" 
                  data={imovel?.situacaoFundiaria} 
                  onDownload={exportarImagem} />
          <GraficoPizza 
                  title="Documentação" 
                  data={imovel?.documentacao} 
                  onDownload={exportarImagem} />
          
          <GraficoPizza 
                  title="Limites do Imóvel" 
                  data={imovel?.limitesImovel} 
                  onDownload={exportarImagem} />
          
          <GraficoPizza 
                  title="Linhas de Barco" 
                  data={imovel?.linhasBarco} 
                  onDownload={exportarImagem} />
          
          <GraficoPizza 
                  title="Linhas de Ônibus" 
                  data={imovel?.linhasOnibus} 
                  onDownload={exportarImagem} />
          
          <GraficoPizza 
                  title="Pavimentação" 
                  data={imovel?.pavimentacao} 
                  onDownload={exportarImagem} />
          
          <GraficoPizza 
          title="Iluminação Pública" 
          data={imovel?.iluminacaoPublica} 
          onDownload={exportarImagem} />
          
          <GraficoPizza 
          title="Equipamentos Urbanos" 
          data={imovel?.equipamentosUrbanos} 
          onDownload={exportarImagem} />
          
          <GraficoPizza 
          title="Espaço de Esporte e Lazer" 
          data={imovel?.espacoaEsporteLazer} 
          onDownload={exportarImagem} />
          
          <GraficoPizza 
          title="Infraestrutura de Saneamento" 
          data={imovel?.insfaSaneamento} 
          onDownload={exportarImagem} />

          
          <GraficoPizza 
          title="Naturalidade" 
          data={dadosEntrevistado?.naturalidade} 
          onDownload={exportarImagem} />
          
          <GraficoPizza 
          title="Sexo" 
          data={dadosEntrevistado?.sexo} 
          onDownload={exportarImagem} />
         
          <GraficoBarra 
          title="Idade" 
          data={dadosEntrevistado?.idade} 
          onDownload={exportarImagem} />
          
          <GraficoPizza 
          title="Escolaridade" 
          data={dadosEntrevistado?.escolaridade} 
          onDownload={exportarImagem} />
         
          <GraficoPizza 
          title="Estado Civil" 
          data={dadosEntrevistado?.estado_civil} 
          onDownload={exportarImagem} />
         
          <GraficoPizza 
          title="Religião" 
          data={dadosEntrevistado?.religiao} 
          onDownload={exportarImagem} />
          
          <GraficoPizza 
          title="Morador" 
          data={dadosEntrevistado?.morador} 
          onDownload={exportarImagem} />
         
          <GraficoPizza 
          title="Tempo de Chegada" 
          data={dadosEntrevistado?.tempo_chegada} 
          onDownload={exportarImagem} />
          
          <GraficoPizza 
          title="Relação com Área do Imóvel" 
          data={dadosEntrevistado?.relacao_area_imovel} 
          onDownload={exportarImagem}
          />
          
          <GraficoPizza 
          title="Relação com Vizinhos" 
          data={dadosEntrevistado?.relacao_vizinhos} 
          onDownload={exportarImagem} />
          
          <GraficoBarra 
          title="Tipo de Alimentação" 
          data={dadosEntrevistado?.tipo_alimentacao} 
          onDownload={exportarImagem} />
         
          <GraficoPizza 
          title="Local de Compras" 
          data={dadosEntrevistado?.local_compras} 
          onDownload={exportarImagem} />
          
          <GraficoPizza 
          title="Serviços Deficitários" 
          data={dadosEntrevistado?.servicos_deficitarios} 
          onDownload={exportarImagem} />
         
          <GraficoPizza 
          title="Sofreu Assalto" 
          data={dadosEntrevistado?.sofreu_assalto} 
          onDownload={exportarImagem} />
         
          <GraficoPizza 
          title="Presenciou Assalto" 
          data={dadosEntrevistado?.viu_assalto} 
          onDownload={exportarImagem} />
          
          <GraficoPizza 
          title="Violência Local" 
          data={dadosEntrevistado?.violencia_local} 
          onDownload={exportarImagem} />
          
          <GraficoPizza 
          title="Pretende Mudar" 
          data={dadosEntrevistado?.pretende_mudar} 
          onDownload={exportarImagem} />
          
          <TabelaDados 
          title="Motivos apresentados para a vontade de se mudar do local: "
           data={dadosEntrevistado?.motivo_mudanca} 
           />
         
          <GraficoPizza 
          title="Conhece UC"
           data={dadosEntrevistado?.conhece_uc} 
           onDownload={exportarImagem} />
         
          <GraficoPizza 
          title="Conhece Proposta da UC" 
          data={dadosEntrevistado?.conhece_proposta_uc} 
          onDownload={exportarImagem} />
         
          <GraficoPizza 
          title="Conhece Área da UC"
           data={dadosEntrevistado?.conhece_area_uc} 
           onDownload={exportarImagem} />
          
          <GraficoPizza 
          title="Utiliza Área da UC" 
          data={dadosEntrevistado?.utiliza_area_uc}
          
           onDownload={exportarImagem} />
          
          <GraficoPizza  
          title="Propostas de Melhoria da área" 
          data={dadosEntrevistado?.proposta_melhoria} 
          onDownload={exportarImagem}
          />
          
          <GraficoPizza
          title="Instituição Conhecida" 
          data={dadosEntrevistado?.instituicao_conhecida} 
          onDownload={exportarImagem}/>
         
          <GraficoPizza
          title="Proteção ao Meio Ambiente" 
          data={dadosEntrevistado?.protecao_ambiente} 
          onDownload={exportarImagem}
          />
         
          <GraficoPizza 
          title="Proteção à Fauna" 
          data={dadosEntrevistado?.protecao_fauna}
          onDownload={exportarImagem} 
           />
         
          <GraficoPizza 
          title="Espaço de Proteção" 
          data={dadosEntrevistado?.espaco_protecao}
           onDownload={exportarImagem} />
          
          <GraficoPizza 
          title="Problemas Ambientais" 
          data={dadosEntrevistado?.problemas_ambientais}
           onDownload={exportarImagem} />
         
          <GraficoPizza 
          title="Cuidados com a saúde familiar: formas utilizadas pela população local" 
          data={dadosEntrevistado?.saude_familia} 
          onDownload={exportarImagem} />
         
          <TabelaDados 
          title="Indicados Consulta Pública" 
          data={dadosEntrevistado?.indicados_consulta_publica} 
           />
         
         

          <GraficoPizza 
          title="Total de Postos" 
          data={dadosPosto?.totalDePostos} 
          onDownload={exportarImagem} />
          
          <GraficoPizza 
          title="Relação de Postos" 
          data={dadosPosto?.relcaoDePostos} 
          onDownload={exportarImagem} />
          
          <GraficoPizza 
          title="Atendimento Ambulatorial" 
          data={dadosPosto?.ambulatorial} 
          onDownload={exportarImagem} />
         
          <GraficoPizza 
          title="Urgência e Emergência" 
          data={dadosPosto?.urgenciaEmergencia} 
          onDownload={exportarImagem} />
          
          <GraficoPizza 
          title="Médicos por Turno" 
          data={dadosPosto?.medicosPorTurno} 
          onDownload={exportarImagem} />
         
          <GraficoPizza 
          title="Total de Médicos por Turno" 
          data={dadosPosto?.medicosPorTurnoTotal} 
          onDownload={exportarImagem} />

         <GraficoPizza 
          title="Total de Escolas" 
          data={dadosEscola?.totalEscolas} 
          onDownload={exportarImagem} />
         
          <GraficoPizza 
          title="Relação de Escolas" 
          data={dadosEscola?.relacaoDeEscolas} 
          onDownload={exportarImagem} />
         
          <GraficoPizza 
          title="Escolas por Iniciativa" 
          data={dadosEscola?.escolasPorIniciativa} 
          onDownload={exportarImagem} />
         
          <GraficoPizza 
          title="Merenda Escolar" 
          data={dadosEscola?.merendaEcolar} 
          onDownload={exportarImagem} />
         
          <GraficoPizza 
          title="Transporte Escolar" 
          data={dadosEscola?.TransporteEscolar} 
          onDownload={exportarImagem} />
         
          <GraficoPizza 
          title="Merenda por Iniciativa" 
          data={dadosEscola?.merendaPorIniciativa} 
          onDownload={exportarImagem} />
         
          <GraficoPizza 
          title="Educação Ambiental por Iniciativa" 
          data={dadosEscola?.educacaoAmbietalPorIniciativa} 
          onDownload={exportarImagem} />
          
          <GraficoPizza 
          title="Transporte Escolar por Iniciativa" 
          data={dadosEscola?.tranporteEscolarIniciativa} 
          onDownload={exportarImagem} />

     
    </div>
  );
}


const styles = {
  container: {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#6d6b6b",
  },

  header: {
    width: "100%",
    padding: "10px 0",
    display: "flex",
    flexDirection: "column" as const, // 👈 isso resolve
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2c2f2f",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.3)",
    gap: "15px", // 👈 espaço entre logo e título
  },
  
  limite: {
    width: "100%",
    padding: "30px 0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "F5F5F5",
  },


  temas: {
    width: "100%",
    padding: "10px 0",
    display: "flex",
    alignItems: "left",
    justifyContent: "left",
    backgroundColor: theme.colors.redTheme.red3,
  },

  logo: {
    height: "80px", // 🔥 pequena e elegante
    objectFit: "contain" as const,
  },
  card: {
    width: "90%",
    maxWidth: "500px",
    display: "flex",
    flexDirection: "column" as const,
    gap: "5px",
    padding: "12px",
    marginBottom: "10px",
    borderRadius: "8px",
    backgroundColor: "#ffffff",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
    cursor: "pointer",
  },

  button: {
    display: "flex",
    alignItems: "center",
    gap: "2px",
    padding: "6px 10px",
    borderRadius: "4px",
    border: "none",
    cursor: "pointer",
    backgroundColor: theme.colors.blueTheme.blue1,
  },

  };

