import { useEffect, useState } from "react";
import { connectionAPIGet } from "../../services/connectionAPI";
import { LocalidadeType } from "../../types/LocalidadeType";



export const useLocalidades = () => {
  const [localidades, setLocalidades] = useState<LocalidadeType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const carregar = async () => {
      try {
        const data = await connectionAPIGet<LocalidadeType[]>('http://192.168.100.15:8080/localidade');
        console.log(data)
        setLocalidades(data);
      } catch (e: any) {
        setError(e.message || "Erro ao carregar localidades");
      } finally {
        setLoading(false);
      }
    };

    carregar();
  }, []);

  return { localidades, loading, error };
};