import Server from "../API/server";
import { IISimpleCursoGestionMateriaPeriodo } from "../interfaces/Personal-Escolar/CursoGestionMateriaPeriodo";
import Storage from "../JWT/Storage";
import { handleErrorResponse } from "../Utils/handles";
export const getMateriaCompletaById = async (
  id: number
): Promise<IISimpleCursoGestionMateriaPeriodo> => {
  const response = await fetch(
    `${Server.API_URL}/curso-gestion-materia-periodo/${id}/get-data`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Storage.getStoredToken()}`,
      },
    }
  );
  return handleErrorResponse(response);
};
