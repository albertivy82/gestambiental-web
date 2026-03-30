import qs from "qs";
// @ts-ignore
import pkceChallenge from "pkce-challenge";
import { AUTH_SERVER, CLIENT_ID, REDIRECT_URI, SCOPE } from "../services/config";
import { Icon } from "../shared/icon/Icon";
import { theme } from "../shared/themes/theme";
import logo from "../assets/images/logo_2.png";
import Text from "../shared/components/text/Text";
import { textTypes } from "../shared/components/text/textTypes";


export default function Login() {
  const onClickLogin = async () => {
    const challenge = await pkceChallenge();
    const codeChallenge = challenge.code_challenge;
    const codeVerifier = challenge.code_verifier;

    localStorage.removeItem("code_verifier");
    localStorage.setItem("code_verifier", codeVerifier);

    console.log("code_verifier salvo:", codeVerifier);
    console.log("preciso saber aqui", challenge, codeChallenge, codeVerifier);

    const config = qs.stringify({
      response_type: "code",
      client_id: CLIENT_ID,
      state: "abdef",
      redirect_uri: REDIRECT_URI,
      scope: SCOPE,
      code_challenge: codeChallenge,
      code_challenge_method: "S256",
    });

    const authorizationUrl = `${AUTH_SERVER}/oauth2/authorize?${config}`;
    window.location.href = authorizationUrl;
  };

  return (
    <div style={styles.container}>

    <div style={styles.header}>
      <img src={logo} alt="Logo" style={styles.logo} />
    </div>
  
    <div style={styles.card}>
      <Text
        type={textTypes.TITLE_BOLD}
        color={theme.colors.redTheme.red2}
        style={{ textAlign: "center" }}
      >
        GESTAMBIENTAL - CONSULTA DE DADOS SOCIOAMBIENTAIS
      </Text>
  
      <button onClick={onClickLogin} style={styles.button}>
        <Icon name="enter" size={30}  color={theme.colors.redTheme.red2} />
        <span style={styles.buttonText}>Login</span>
      </button>
    </div>
  
  </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#5f6161",
  },

  header: {
    width: "100%",
    padding: "10px 0",
    display: "flex",
    justifyContent: "center",
    backgroundColor: "#2c2f2f",
    boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
  },

  logo: {
    height: "80px", // 🔥 pequena e elegante
    objectFit: "contain" as const,
  },

  card: {
    marginTop: "60px", // espaço abaixo do header
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    gap: "25px",
    padding: "40px",
    borderRadius: "12px",
    backgroundColor: "#2c2f2f",
    boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
    maxWidth: "400px",
  },

  button: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "12px 20px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    backgroundColor: theme.colors.blueTheme.blue1,
  },

  buttonText: {
    color: theme.colors.redTheme.red2,
    fontSize: "16px",
    fontWeight: "bold" as const,
  },
};