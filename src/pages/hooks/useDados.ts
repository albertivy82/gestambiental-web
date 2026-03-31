import { useEffect, useState } from "react";
import { connectionAPIGet } from "../../services/connectionAPI";
import { MoradorConsultaType } from "../../types/MoradorConsultaType";

export const useDados = (id: number) => {
  const [dadosMorador, setDadosMorador] = useState<MoradorConsultaType>();
   const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const carregar = async () => {
      try {
        const data = await connectionAPIGet<MoradorConsultaType>(
          `http://192.168.100.21:8080/morador/consulta-morador/${id}`
        );
        setDadosMorador(data);
      } catch (e: any) {
        setError(e.message || "Erro ao carregar localidade");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      carregar();
    }
  }, [id]);


  
  
  return { dadosMorador, loading,};
};