// src/routes/ProtectedRoute.tsx
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";


// import { AuthContext } from "../context/AuthContext";


interface ProtectedRouteProps {
  children: React.ReactNode;
  rolesAllowed?: string[];
}

export const ProtectedRoute = ({ children, rolesAllowed }: ProtectedRouteProps) => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("AuthContext not found");
  const { user, loading } = context;

  if (loading) return <div className="text-center p-8">Cargando...</div>;

  // No autenticado,si no esta autenticado entonces lo redirige al home
  if (!user) return <Navigate to="/" replace/>;

  // Verificar si tiene el rol necesario
  //si hay roles permitidos y si 

  //si el usuario esta autenticado entonces pregunto si tiene el rol necesario para usar la ruta
  if (rolesAllowed && !rolesAllowed.includes(user.rol?.nombre ?? "")) {
    return <Navigate to="/unauthorized" replace/>;
  }

  return children;
};


