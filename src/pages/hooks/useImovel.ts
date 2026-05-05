import { useEffect, useState } from "react";
import { connectionAPIGet } from "../../services/connectionAPI";
import { ImovelConsultaType } from "../../types/ImovelConsultaType";

export const useImovel = (id: number) => {
  const [imovel, setImovel] = useState<ImovelConsultaType>();
  const [error, setError] = useState("");

  useEffect(() => {
    
        const carregar = async () => {
          try {
            const data = await connectionAPIGet<ImovelConsultaType>(
              `/api/imovel/consulta-imovel/${id}`
            );

            console.log("retorno data", data.linhasOnibus)

            setImovel(data);
          } catch (e: any) {
            setError(e.message || "Erro ao carregar localidade");
          }
      
        };
  if (id) {
      carregar();
    }
  }, [id]);


  return { imovel};
};