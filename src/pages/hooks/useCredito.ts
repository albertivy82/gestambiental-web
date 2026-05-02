import { useEffect, useState } from "react";
import { connectionAPIGet } from "../../services/connectionAPI";
import { DadosType } from "../../types/DadosType";

export const useCredito = (id: number) => {
  const [credito, setCredito] = useState<DadosType[]>();
  const [error, setError] = useState("");

  useEffect(() => {
    
          const carregar = async () => {
              
                try {
                  const data = await connectionAPIGet<DadosType[]>(
                    `http://192.168.100.15:8080/credito/consulta-credito/${id}`
                  );
                  setCredito(data);
                  console.log("recebeu estes dados de participação?",data)
                } catch (e: any) {
                  setError(e.message || "Erro ao carregar localidade");
                }
            };


   if (id) {
      carregar();
    }
  }, [id]);


  
  
  return { credito};
};