import { useEffect, useState } from "react";
import { connectionAPIGet } from "../../services/connectionAPI";
import { EscolaConsultaType } from "../../types/EscolaConsultaType";

export const useEscola = (id: number) => {
  const [dadosEscola, setDadosEscola] = useState<EscolaConsultaType>();
  const [error, setError] = useState("");

  useEffect(() => {
    
        const carregar = async () => {
          try {
            const dataEscola = await connectionAPIGet<EscolaConsultaType>(
              `/api/escola/consulta-escolas/${id}`
            );

              setDadosEscola(dataEscola);
          } catch (e: any) {
            setError(e.message || "Erro ao carregar localidade");
          }
      
        };
  if (id) {
      carregar();
    }
  }, [id]);


  
  
  return { dadosEscola};
};