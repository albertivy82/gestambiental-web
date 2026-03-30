import { useEffect, useState } from "react";
import { connectionAPIGet } from "../../services/connectionAPI";
import { DadosType } from "../../types/DadosType";

export const useDados = (id: number) => {
  const [sexoMoradores, setSexoMoradores] = useState<DadosType[]>();
  const [escolaridadeMoradores, setEscolaridadeMoradores] = useState<DadosType[]>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const carregar = async () => {
      try {
        const data = await connectionAPIGet<DadosType[]>(
          `http://192.168.100.21:8080/morador/consulta-sexo/${id}`
        );
        setSexoMoradores(data);
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


  useEffect(() => {
    const carregar = async () => {
      try {
        const data = await connectionAPIGet<DadosType[]>(
          `http://192.168.100.21:8080/morador/consulta-escolaridade/${id}`
        );
        setEscolaridadeMoradores(data);
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

  return { sexoMoradores, escolaridadeMoradores, loading, error };
};