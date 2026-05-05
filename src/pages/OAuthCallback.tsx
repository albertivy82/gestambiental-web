import { useEffect } from "react";
import { useRequest } from "../services/auth";

export default function Callback() {
  const { handleUrlRedirect } = useRequest();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

    const codeVerifier = localStorage.getItem("code_verifier");

    if (code && codeVerifier) {
      handleUrlRedirect(code, codeVerifier);
    }
  }, []);

  return <div>Autenticando...</div>;
}