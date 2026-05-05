import { useEffect, useState } from "react";
import { connectionAPIGet } from "../../services/connectionAPI";
import { MoradorConsultaType } from "../../types/MoradorConsultaType";

export const useMorador = (id: number) => {
  const [dadosMorador, setDadosMorador] = useState<MoradorConsultaType>();
  const [error, setError] = useState("");

  useEffect(() => {
    
        const carregar = async () => {
          try {
            const dataMorador = await connectionAPIGet<MoradorConsultaType>(
              `/api/morador/consulta-morador/${id}`
            );

          
            setDadosMorador(dataMorador);
          } catch (e: any) {
            setError(e.message || "Erro ao carregar localidade");
          }
      
        };
  if (id) {
      carregar();
    }
  }, [id]);


  
  
  return { dadosMorador};
};