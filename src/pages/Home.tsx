import { useNavigate } from "react-router-dom";
import { useLocalidades } from "./hooks/useLocalidades";
import Text from "../shared/components/text/Text";
import { textTypes } from "../shared/components/text/textTypes";
import logo from "../assets/images/logo_2.png";
import { theme } from "../shared/themes/theme";


export default function Home() {
  const navigate = useNavigate();
  const { localidades, loading, error } = useLocalidades();

  if (loading) return <div>Carregando localidades...</div>;
  if (error) return <div>Erro: {error}</div>;

  return (
    <div style={styles.container}>
        <div style={styles.header}>
              <img src={logo} alt="Logo" style={styles.logo} />
              <Text
                type={textTypes.TITLE_BOLD}
                color={theme.colors.redTheme.red3}
                style={{ textAlign: "center" }}
                  >LISTA DE LOCALIDADES
               </Text>
        </div>   
        <div style={styles.limite}></div>      
      {localidades.map((item) => (
        <div
          key={item.id}
          onClick={() => navigate(`/localidade/${item.id}`)}
          style={styles.card}
        >
           <Text
                type={textTypes.BUTTON_REGULAR}
                color={'#000000'}
              >
                Nome: {item.nome}
              </Text>
             
              <Text
                type={textTypes.BUTTON_REGULAR}
                color={'#000000'}
              >
               
                Município: {item.municipio}
               
              </Text>
              <Text
                type={textTypes.BUTTON_REGULAR}
                color={'#000000'}
              >
               Iniciativa: {item.esfera}
              </Text>
        </div>
      ))}

     
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

  };

