import { useEffect, useState } from "react";
import { connectionAPIGet } from "../../services/connectionAPI";
import { LocalidadeType } from "../../types/LocalidadeType";

export const useLocalidade = (id: number) => {
  const [localidade, setLocalidade] = useState<LocalidadeType>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const carregar = async () => {
      try {
        const data = await connectionAPIGet<LocalidadeType>(
          `/api/localidade/${id}`
        );
        setLocalidade(data);
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

  return { localidade, loading, error };
};