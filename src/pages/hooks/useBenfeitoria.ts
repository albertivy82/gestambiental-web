import { useEffect, useState } from "react";
import { connectionAPIGet } from "../../services/connectionAPI";
import { BenfeitoriaConsultaType } from "../../types/BenfeitoriaConsultaType";

export const useBenfeitoria = (id: number) => {
  const [benfeitoria, setBenfeitoria] = useState<BenfeitoriaConsultaType>();
  const [error, setError] = useState("");

  useEffect(() => {
    
        const carregar = async () => {
          try {
            const data = await connectionAPIGet<BenfeitoriaConsultaType>(
              `/api/benfeitoria/consulta-benfeitoria/${id}`
            );
              console.log()
          setBenfeitoria(data);
          } catch (e: any) {
            setError(e.message || "Erro ao carregar localidade");
          }
      
        };
  if (id) {
      carregar();
    }
  }, [id]);


  
  
  return { benfeitoria};
};