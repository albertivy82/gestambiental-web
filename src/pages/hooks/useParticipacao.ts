import { useEffect, useState } from "react";
import { connectionAPIGet } from "../../services/connectionAPI";
import { DadosType } from "../../types/DadosType";

export const useParticipacao = (id: number) => {
  const [participacao, setParticipacaor] = useState<DadosType[]>();
  const [error, setError] = useState("");

  useEffect(() => {
    
          const carregar = async () => {
              
                try {
                  const dataParticipacao = await connectionAPIGet<DadosType[]>(
                    `http://192.168.100.15:8080/participacao-instituicao/consulta-participacao-instituicao/${id}`
                  );
                  setParticipacaor(dataParticipacao);
                  console.log("recebeu estes dados de participação?",dataParticipacao)
                } catch (e: any) {
                  setError(e.message || "Erro ao carregar localidade");
                }
            };


   if (id) {
      carregar();
    }
  }, [id]);


  
  
  return { participacao};
};