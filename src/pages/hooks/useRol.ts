import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

//helper para enviar los roles que necesita para validacion de datos,retorna un boolean
export function useHasRole(rolesAllowed: string[]): boolean {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("error en el contexto");
  }
  const { user } = context;
  return rolesAllowed.includes(user?.rol?.nombre || "");
}
