import { useEffect, useState } from "react";
import { connectionAPIGet } from "../../services/connectionAPI";
import { PostosConsultaType } from "../../types/PostoConsultaType";

export const usePosto = (id: number) => {
  const [dadosPosto, setDadosPosto] = useState<PostosConsultaType>();
  const [error, setError] = useState("");

  useEffect(() => {
    
        const carregar = async () => {
          try {
            const dataPosto = await connectionAPIGet<PostosConsultaType>(
              `/api/posto-de-saude/consulta-postos/${id}`
            );

              setDadosPosto(dataPosto);
          } catch (e: any) {
            setError(e.message || "Erro ao carregar localidade");
          }
      
        };
  if (id) {
      carregar();
    }
  }, [id]);


  
  
  return { dadosPosto};
};