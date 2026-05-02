import { useEffect, useState } from "react";
import { connectionAPIGet } from "../../services/connectionAPI";
import { AguaConsultaType } from "../../types/AguaConsultaType";

export const useAgua = (id: number) => {
  const [agua, setAgua] = useState<AguaConsultaType>();
  const [error, setError] = useState("");

  useEffect(() => {
    
        const carregar = async () => {
          try {
            const dataMorador = await connectionAPIGet<AguaConsultaType>(
              `http://192.168.100.15:8080/agua/consulta-agua/${id}`
            );

          
            setAgua(dataMorador);
          } catch (e: any) {
            setError(e.message || "Erro ao carregar localidade");
          }
      
        };
  if (id) {
      carregar();
    }
  }, [id]);


  
  
  return { agua};
};