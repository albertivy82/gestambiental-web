import axios from "axios";
import qs from "qs";
import { useNavigate } from "react-router-dom";
import { CLIENT_ID, REDIRECT_URI } from "./config";
import { storeAuthData } from "./authStore";

const authServer = axios.create({
  baseURL: "https://dadoseconomicos.ideflorbio.pa.gov.br"
});

export interface OAuthAuthorizationTokenResponse {
  access_token: string;
  refresh_token: string;
  scope: string;
  token_type: 'bearer' | string;
  expires_in: number;
  [key: string]: string | number;
}

export function useRequest() {
    const navigate = useNavigate();
  console.log("está sendo chamado aqui?")
  
  const handleUrlRedirect = async (code: any, codeVerifier: string) => {
    const data = {
      grant_type: "authorization_code",
      code,
      redirect_uri: REDIRECT_URI,
      client_id: CLIENT_ID,
      code_verifier: codeVerifier,
    };
    
    const encodedData = qs.stringify(data);

    try {
      const response = await authServer.post(
        "/oauth2/token",
        encodedData,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      await storeAuthData(response.data);
      navigate('/home');
    } catch (error) {
      console.error('Error Handling url redirect:', error);
      
    console.error("ERRO:", error);
    }
  };

  return { handleUrlRedirect };
}