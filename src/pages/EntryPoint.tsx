import { Navigate } from "react-router-dom";

export default function EntryPoint() {
  const token = localStorage.getItem("token");

  if (token && token !== "undefined" && token !== "null") {
    return <Navigate to="/home" replace />;
  }

  localStorage.clear();

  return <Navigate to="/login" replace />;
}
