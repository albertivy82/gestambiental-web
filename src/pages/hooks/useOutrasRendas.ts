import { useEffect, useState } from "react";
import { connectionAPIGet } from "../../services/connectionAPI";
import { OutrasRendasType } from "../../types/OutrasRendasType";

export const useOutrasRendas = (id: number) => {
  const [outrasRendas, setOutrasRendas] = useState<OutrasRendasType>();
  const [error, setError] = useState("");

  useEffect(() => {
    
        const carregar = async () => {
          try {
            const data = await connectionAPIGet<OutrasRendasType>(
              `http://192.168.100.15:8080/outras-fontes-de-renda/consulta-outras-fontes/${id}`
            );

          
            setOutrasRendas(data);
          } catch (e: any) {
            setError(e.message || "Erro ao carregar localidade");
          }
      
        };
  if (id) {
      carregar();
    }
  }, [id]);


  
  
  return { outrasRendas};
};