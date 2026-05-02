import { useEffect, useState } from "react";
import { connectionAPIGet } from "../../services/connectionAPI";
import { EntrevistadoConsultaType } from "../../types/EntrevistadoConsultaType";

export const useEntrevistado = (id: number) => {
  const [dadosEntrevistado, setDadosEntrevistado] = useState<EntrevistadoConsultaType>();
  const [error, setError] = useState("");

  useEffect(() => {
    
        const carregar = async () => {
          try {
            const dataEntrevistado = await connectionAPIGet<EntrevistadoConsultaType>(
              `http://192.168.100.15:8080/entrevistado/consulta-entrevistado/${id}`
            );

              setDadosEntrevistado(dataEntrevistado);
          } catch (e: any) {
            setError(e.message || "Erro ao carregar localidade");
          }
      
        };
  if (id) {
      carregar();
    }
  }, [id]);


  
  
  return { dadosEntrevistado};
};