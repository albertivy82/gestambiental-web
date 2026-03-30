import { useNavigate } from "react-router-dom";
import Text from "../shared/components/text/Text";
import { textTypes } from "../shared/components/text/textTypes";
import logo from "../assets/images/logo_2.png";
import { theme } from "../shared/themes/theme";
import { useParams } from "react-router-dom";
import { useLocalidade } from "./hooks/useLocalidade";
import { useDados } from "./hooks/useDados";
import { Bar, BarChart, CartesianGrid, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import GraficoPizza from "../shared/components/graphics/GraficoPizza";
import { useRef } from "react";
import { toPng } from "html-to-image";
import { Icon } from "../shared/icon/Icon";
import GraficoBarra from "../shared/components/graphics/GraficoBarra";


export default function Dados() {
  const navigate = useNavigate();
  const { id } = useParams();
  const {localidade, loading: loadingLocalidade, error: errorLocalidade} = useLocalidade(Number(id));
  const {sexoMoradores, escolaridadeMoradores, loading: loadingSexo, error: errorSexo} = useDados(Number(id));
  const ref = useRef<HTMLDivElement>(null);
  
  
  if (loadingLocalidade || loadingSexo) return <div>Carregando dados...</div>;
  if (errorLocalidade) return <div>Erro da localidade: {errorLocalidade}</div>;
  if (errorSexo) return <div>Erro do gráfico: {errorSexo}</div>;

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
          data={sexoMoradores}
          onDownload={exportarImagem}
        />

        <GraficoBarra
           title="Moradores - Escolaridade"
          data={escolaridadeMoradores}
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

