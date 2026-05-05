import { useEffect, useState } from "react";
import { connectionAPIGet } from "../../services/connectionAPI";
import { MoradorConsultaType } from "../../types/MoradorConsultaType";
import { AtividadeProdutivaConsultaType } from "../../types/AtividadeProdutivaType";

export const useAtividadeProdutiva = (id: number) => {
  const [atividadeProdutiva, setAtividadeProdutiva] = useState<AtividadeProdutivaConsultaType>();
  const [error, setError] = useState("");

  useEffect(() => {
    
        const carregar = async () => {
          try {
            const data = await connectionAPIGet<AtividadeProdutivaConsultaType>(
              `/api/atividade-produtiva/consulta-atividade-produtiva/${id}`
            );

          
            setAtividadeProdutiva(data);
          } catch (e: any) {
            setError(e.message || "Erro ao carregar localidade");
          }
      
        };
  if (id) {
      carregar();
    }
  }, [id]);


  
  
  return { atividadeProdutiva};
};