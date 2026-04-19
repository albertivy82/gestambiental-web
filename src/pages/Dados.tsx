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


export default function Dados() {
  const navigate = useNavigate();
  const { id } = useParams();
  const {localidade, loading: loadingLocalidade, error: errorLocalidade} = useLocalidade(Number(id));
  const {dadosMorador} = useMorador(Number(id));
  const {participacao} = useParticipacao(Number(id));
  const {atividadeProdutiva} = useAtividadeProdutiva(Number(id));
  const {servicosComunicacao} = useServicosComunicacao(Number(id));
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
        <div style={styles.limite}></div>      
    
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

       
       <GraficoPizza
           title="Serviços de Comunicação Utilizados"
          data={servicosComunicacao}
          onDownload={exportarImagem}
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
    backgroundColor: "#F5F5F5",
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

