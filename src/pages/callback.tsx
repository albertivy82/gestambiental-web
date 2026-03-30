import { useEffect, useRef } from "react";
import { useRequest } from "../services/auth";

export default function Callback() {
  const { handleUrlRedirect } = useRequest();
  const jaExecutou = useRef(false);

  useEffect(() => {
    if (jaExecutou.current) return;
    jaExecutou.current = true;

    const executar = async () => {
      const params = new URLSearchParams(window.location.search);
      const code = params.get("code");
      const codeVerifier = localStorage.getItem("code_verifier");

      console.log("code:", code);
      console.log("codeVerifier:", codeVerifier);

      if (!code || !codeVerifier) {
        console.log("code ou codeVerifier não encontrado");
        return;
      }

      await handleUrlRedirect(code, codeVerifier);
    };

    executar();
  }, [handleUrlRedirect]);

  return <div>Autenticando...</div>;
}