import { Navigate } from "react-router-dom";

export default function EntryPoint() {
  const token = localStorage.getItem("token");

  if (token) {
    return <Navigate to="/home" replace />;
  }

  return <Navigate to="/login" replace />;
}