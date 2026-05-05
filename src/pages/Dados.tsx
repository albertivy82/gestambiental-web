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
  const { localidade, loading: loadingLocalidade, error: errorLocalidade } = useLocalidade(Number(id));
  const { dadosMorador } = useMorador(Number(id));
  const { participacao } = useParticipacao(Number(id));
  const { atividadeProdutiva } = useAtividadeProdutiva(Number(id));
  const { servicosComunicacao } = useServicosComunicacao(Number(id));
  const { outrasRendas } = useOutrasRendas(Number(id));
  const { credito } = useCredito(Number(id));
  const { agua } = useAgua(Number(id));
  const { benfeitoria } = useBenfeitoria(Number(id));
  const { imovel } = useImovel(Number(id));
  const { dadosEntrevistado } = useEntrevistado(Number(id));
  const { dadosPosto } = usePosto(Number(id));
  const { dadosEscola } = useEscola(Number(id));

  const ref = useRef<HTMLDivElement>(null);


  if (loadingLocalidade) return <div>Carregando dados...</div>;
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
          style={{ textAlign: "center" }}>
          I - PERFIL DOS MORADORES
        </Text>
      </div>

      <GraficoPizza
        title="Sexo"
        data={dadosMorador?.sexo}
        onDownload={exportarImagem}
      />

      <GraficoPizza
        title="Escolaridade"
        data={dadosMorador?.escolaridade}
        onDownload={exportarImagem}
      />

      <GraficoPizza
        title="Religião"
        data={dadosMorador?.religiao}
        onDownload={exportarImagem}
      />

      <GraficoBarra
        title="Estado Civil"
        data={dadosMorador?.estadoCivil}
        onDownload={exportarImagem}
      />

      <GraficoBarra
        title="Faixa Etária"
        data={dadosMorador?.faixaEtaria}
        onDownload={exportarImagem}
      />


      <GraficoPizza
        title="Percenual de Estudantes"
        data={dadosMorador?.estudo}
        onDownload={exportarImagem}
      />

      <GraficoBarra
        title="Situação dos Estudantes"
        data={dadosMorador?.detalheEstudo}
        onDownload={exportarImagem}
      />

      <GraficoPizza
        title="Vínculos de Trabalhos"
        data={dadosMorador?.trabalho}
        onDownload={exportarImagem}
      />

      <GraficoBarra
        title="Atividades de Trabalho"
        data={dadosMorador?.detalheTrabalho}
        onDownload={exportarImagem}
      />

      
      <div style={styles.temas}>
        <Text
          type={textTypes.TITLE_BOLD}
          color={theme.colors.mainTheme.black}
          style={{ textAlign: "center" }}>
          II - INFRAESTRUTURA DOMICILIAR E COTIDIANA
        </Text>
      </div>


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
        title="Meio de Locomoção"
        data={benfeitoria?.meioLocomocao}
        onDownload={exportarImagem}
      />

      <GraficoPizza
        title="Meio de Informativo Mais utilizado"
        data={benfeitoria?.meioComunicacao}
        onDownload={exportarImagem}
      />


      <div style={styles.temas}>
        <Text
          type={textTypes.TITLE_BOLD}
          color={theme.colors.mainTheme.black}
          style={{ textAlign: "center" }}>
          III - SAÚDE NA LOCALIDADE
        </Text>
      </div>


      <TabelaDados
        title="Total de Postos de Saúde"
        data={dadosPosto?.totalDePostos}
      />

      <TabelaDados
        title="Relação dos Postos de Saúde"
        data={dadosPosto?.relcaoDePostos}
      />

      <GraficoPizza
        title="Atendimento Ambulatorial"
        data={dadosPosto?.ambulatorial}
        onDownload={exportarImagem} />

      <GraficoPizza
        title="Serviços de Urgência e Emergência"
        data={dadosPosto?.urgenciaEmergencia}
        onDownload={exportarImagem} />

      <GraficoBarra
        title="Médicos por Turno"
        data={dadosPosto?.medicosPorTurno}
        onDownload={exportarImagem}
      />

      <GraficoBarra
        title="Doenças Relatadas"
        data={dadosMorador?.doencas}
        onDownload={exportarImagem}
      />

      <GraficoPizza
        title="Cuidados com a saúde familiar"
        data={dadosEntrevistado?.saude_familia}
        onDownload={exportarImagem} />



      <div style={styles.temas}>
        <Text
          type={textTypes.TITLE_BOLD}
          color={theme.colors.mainTheme.black}
          style={{ textAlign: "center" }}>
          IV - PERFIL DO ENTREVISTADO
        </Text>
      </div>

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
        title="Reside no Imóvel"
        data={dadosEntrevistado?.morador}
        onDownload={exportarImagem} />

      <div style={styles.temas}>
        <Text
          type={textTypes.TITLE_BOLD}
          color={theme.colors.mainTheme.black}
          style={{ textAlign: "center" }}>
          V - RELAÇÃO COM A LOCALIDADE
        </Text>
      </div>

      <GraficoPizza
        title="Tempo de Residência"
        data={dadosEntrevistado?.tempo_chegada}
        onDownload={exportarImagem} />

      <GraficoPizza
        title="Relação com o Imóvel"
        data={dadosEntrevistado?.relacao_area_imovel}
        onDownload={exportarImagem}
      />

      <GraficoPizza
        title="Relação com Vizinhos"
        data={dadosEntrevistado?.relacao_vizinhos}
        onDownload={exportarImagem} />


      <GraficoPizza
        title="Intenção de Mudança"
        data={dadosEntrevistado?.pretende_mudar}
        onDownload={exportarImagem} />

      <TabelaDados
        title="Motivos de Mudança"
        data={dadosEntrevistado?.motivo_mudanca}
      />

      <div style={styles.temas}>
        <Text
          type={textTypes.TITLE_BOLD}
          color={theme.colors.mainTheme.black}
          style={{ textAlign: "center" }}>
         VI - CONDIÇÕES DE VIDA E PERCEPÇÃO LOCAL
        </Text>
      </div>

      <GraficoPizza
        title="Local de Compras"
        data={dadosEntrevistado?.local_compras}
        onDownload={exportarImagem} />

      <GraficoBarra
        title="Tipo de Alimentação"
        data={dadosEntrevistado?.tipo_alimentacao}
        onDownload={exportarImagem} />


      <GraficoPizza
        title="Serviços Deficitários"
        data={dadosEntrevistado?.servicos_deficitarios}
        onDownload={exportarImagem} />


      <GraficoPizza
        title="Instituições Conhecidas"
        data={dadosEntrevistado?.instituicao_conhecida}
        onDownload={exportarImagem} />

      <GraficoPizza
        title="Serviços de Comunicação"
        data={servicosComunicacao}
        onDownload={exportarImagem}
      />

      <div style={styles.temas}>
        <Text
          type={textTypes.TITLE_BOLD}
          color={theme.colors.mainTheme.black}
          style={{ textAlign: "center" }}>
          SEGURANÇA PÚBLICA
        </Text>
      </div>

      <GraficoPizza
        title="Já Sofreu Assalto"
        data={dadosEntrevistado?.sofreu_assalto}
        onDownload={exportarImagem} />

      <GraficoPizza
        title="Já Presenciou Assalto"
        data={dadosEntrevistado?.viu_assalto}
        onDownload={exportarImagem} />

      <GraficoPizza
        title="Problemas de Violência"
        data={dadosEntrevistado?.violencia_local}
        onDownload={exportarImagem} />


      <div style={styles.temas}>
        <Text
          type={textTypes.TITLE_BOLD}
          color={theme.colors.mainTheme.black}
          style={{ textAlign: "center" }}>
          VIII - MEIO AMBIENTE E CONSERVAÇÃO
        </Text>
      </div>

      <GraficoPizza
        title="Conhecimnto sobre Unidades de Conservação"
        data={dadosEntrevistado?.conhece_uc}
        onDownload={exportarImagem} />

      <GraficoPizza
        title="Conhecimentos da Proposta da Unidade de Conservação"
        data={dadosEntrevistado?.conhece_proposta_uc}
        onDownload={exportarImagem} />

      <GraficoPizza
        title="Conhecimento da Área"
        data={dadosEntrevistado?.conhece_area_uc}
        onDownload={exportarImagem} />

      <GraficoPizza
        title="Uso da área"
        data={dadosEntrevistado?.utiliza_area_uc}

        onDownload={exportarImagem} />

      <GraficoPizza
        title="Propostas de Melhoria da área"
        data={dadosEntrevistado?.proposta_melhoria}
        onDownload={exportarImagem}
      />

      <GraficoPizza
        title="Importância da Proteção ao Meio Ambiente"
        data={dadosEntrevistado?.protecao_ambiente}
        onDownload={exportarImagem}
      />

      <GraficoPizza
        title="Importância da Proteção à Fauna"
        data={dadosEntrevistado?.protecao_fauna}
        onDownload={exportarImagem}
      />


      <GraficoPizza
        title="Problemas Ambientais"
        data={dadosEntrevistado?.problemas_ambientais}
        onDownload={exportarImagem} />

      <GraficoPizza
        title="Áreas que precisam de Proteção/Conservação Ambiental"
        data={dadosEntrevistado?.espaco_protecao}
        onDownload={exportarImagem} />



      <div style={styles.temas}>
        <Text
          type={textTypes.TITLE_BOLD}
          color={theme.colors.mainTheme.black}
          style={{ textAlign: "center" }}>
          ASPECTOS FUNDIÁRIOS
        </Text>
      </div>

      <GraficoPizza
        title="Benfeitorias por Imóvel"
        data={imovel?.benfeitoriasPorImovel}
        onDownload={exportarImagem} />

      <GraficoPizza
        title="Área dos Imóveis"
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

      <div style={styles.temas}>
        <Text
          type={textTypes.TITLE_BOLD}
          color={theme.colors.mainTheme.black}
          style={{ textAlign: "center" }}>
          X - INFRAESTRUTURA DO ENTORNO
        </Text>
      </div>


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
        title="Espaços de Esporte e Lazer"
        data={imovel?.espacoaEsporteLazer}
        onDownload={exportarImagem} />

      <GraficoPizza
        title="Infraestrutura de Saneamento"
        data={imovel?.insfaSaneamento}
        onDownload={exportarImagem} />

      <div style={styles.temas}>
        <Text
          type={textTypes.TITLE_BOLD}
          color={theme.colors.mainTheme.black}
          style={{ textAlign: "center" }}>
          XI - CARACTERÍSTICAS DAS BENFEITORIAS
        </Text>
      </div>

      <GraficoPizza
        title="Finalidade das Benfeitorias"
        data={benfeitoria?.tipoBenfeitoria}
        onDownload={exportarImagem}
      />


      <GraficoPizza
        title="Função das Benfeitorias"
        data={benfeitoria?.funcao}
        onDownload={exportarImagem}
      />

      <GraficoPizza
        title="impermeabilização do solo"
        data={benfeitoria?.impermeabilizacaoSolo}
        onDownload={exportarImagem}
      />

      <GraficoPizza
        title="Tipo de Limite"
        data={benfeitoria?.limites}
        onDownload={exportarImagem}
      />

      <GraficoPizza
        title="Área Construída"
        data={benfeitoria?.area}
        onDownload={exportarImagem}
      />

      <GraficoPizza
        title="Material das Paredes"
        data={benfeitoria?.paredes}
        onDownload={exportarImagem}
      />

      <GraficoPizza
        title="Cobertura"
        data={benfeitoria?.tipoCobertura}
        onDownload={exportarImagem}
      />


      <GraficoPizza
        title="Esquadrias"
        data={benfeitoria?.tipoEsquadrias}
        onDownload={exportarImagem}
      />

      <GraficoPizza
        title="Origem da areia utilizada na construção"
        data={benfeitoria?.origemAreiaConstrucao}
        onDownload={exportarImagem}
      />
      <GraficoPizza
        title="Origem da madeira utilizada na construção"
        data={benfeitoria?.origemMadeiraConstrucao}
        onDownload={exportarImagem}
      />

      <GraficoPizza
        title="Origem da pedra utilizada na construção"
        data={benfeitoria?.origemPedraConstrucao}
        onDownload={exportarImagem}
      />


      <div style={styles.temas}>
        <Text
          type={textTypes.TITLE_BOLD}
          color={theme.colors.mainTheme.black}
          style={{ textAlign: "center" }}>
          XII - SANEAMENTO BÁSICO
        </Text>
      </div>

      <GraficoPizza
        title="Agua - Tipo de Fornecimento da água"
        data={agua?.tipoDeFornecimento}
        onDownload={exportarImagem}
      />

      <GraficoPizza
        title="Agua- Método de Tratamento dágua"
        data={agua?.metodoTratamento}
        onDownload={exportarImagem}
      />

      <GraficoPizza
        title="Profundidade de Poços"
        data={agua?.profundidadePoco}
        onDownload={exportarImagem}
      />

      <GraficoPizza
        title="Qualidade da Água"
        data={agua?.qualidadeDaAgua}
        onDownload={exportarImagem}
      />

      <GraficoPizza
        title="Coloração da Água"
        data={agua?.corDagua}
        onDownload={exportarImagem}
      />

      <GraficoPizza
        title="Sabor da Água"
        data={agua?.saborDagua}
        onDownload={exportarImagem}
      />

      <GraficoPizza
        title="Cheiro da Água"
        data={agua?.cheiroDagua}
        onDownload={exportarImagem}
      />

      <GraficoPizza
        title="Ocorrência de Alagamentos"
        data={benfeitoria?.alagamentos}
        onDownload={exportarImagem}
      />

      <GraficoPizza
        title="Época de Alagamentos"
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



      <div style={styles.temas}>
        <Text
          type={textTypes.TITLE_BOLD}
          color={theme.colors.mainTheme.black}
          style={{ textAlign: "center" }}>
          XIII - EDUCAÇÃO
        </Text>
      </div>


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


      <div style={styles.temas}>
        <Text
          type={textTypes.TITLE_BOLD}
          color={theme.colors.mainTheme.black}
          style={{ textAlign: "center" }}>
          XIV - ASPECTOS ECONÔMICOS
        </Text>
      </div>


      <GraficoBarra
        title="Atividades Produtivas"
        data={atividadeProdutiva?.atividades}
        onDownload={exportarImagem}
      />

      <GraficoBarra
        title="Atividades Produtivas - Faturamento Mensal (Em R$)"
        data={atividadeProdutiva?.faturamento}
        onDownload={exportarImagem}
      />

      <GraficoPizza
        title="Pessoas Envolvidas por Atividade Produtiva"
        data={atividadeProdutiva?.pessoasEnvolvidas}
        onDownload={exportarImagem}
      />


      <GraficoBarra
        title="Outras Fontes de Renda"
        data={outrasRendas?.fonte}
        onDownload={exportarImagem}
      />

      <GraficoBarra
        title="Beneficiário de Outras Fontes de renda"
        data={outrasRendas?.beneficiarios}
        onDownload={exportarImagem}
      />

      <GraficoBarra
        title="Faturamento Mensal de Outras Fontes de Renda (Em R$)"
        data={outrasRendas?.rendaMesTotal}
        onDownload={exportarImagem}
      />

      <GraficoBarra
        title="Crédito Acessado (R$)"
        data={credito}
        onDownload={exportarImagem}
      />

      <div style={styles.temas}>
        <Text
          type={textTypes.TITLE_BOLD}
          color={theme.colors.mainTheme.black}
          style={{ textAlign: "center" }}>
          XV - PARTICIPAÇÃO INSTITUCIONAL
        </Text>
      </div>

      <GraficoBarra
        title="Participacao Institucional de Moradores"
        data={participacao}
        onDownload={exportarImagem}
      />



      <div style={styles.temas}>
        <Text
          type={textTypes.TITLE_BOLD}
          color={theme.colors.mainTheme.black}
          style={{ textAlign: "center" }}>
         XVI - CONSULTA PÚBLICA
        </Text>
      </div>
      <TabelaDados
        title="Indicados Consulta Pública"
        data={dadosEntrevistado?.indicados_consulta_publica}
      />







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
    alignItems: "center",
    justifyContent: "center",
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

