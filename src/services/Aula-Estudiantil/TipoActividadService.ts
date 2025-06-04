import Server from "../API/server";
import { TipoActividad } from "../interfaces/Aula-Estudiantil/TipoActividad";
import Storage from "../JWT/Storage";
import { handleErrorResponse } from "../Utils/handles";

export const getTipoActividades = async (): Promise<TipoActividad[]> => {
    const response = await fetch(
        `${Server.API_URL}/tipo-actividad/get-all`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${Storage.getStoredToken()}`,
            },
        }
    );
    return handleErrorResponse(response);
}