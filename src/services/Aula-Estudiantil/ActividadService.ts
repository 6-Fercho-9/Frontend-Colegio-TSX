import Server from "../API/server";
import { ActividadResponse } from "../Backend-Response/ActividadResponse";
import { Actividad, ListActividadResponse } from "../interfaces/Aula-Estudiantil/Actividad";
import Storage from "../JWT/Storage";
import { handleErrorResponse } from "../Utils/handles";

export const getActividades = async (id: number): Promise<ListActividadResponse> => {
    const response = await fetch(
        `${Server.API_URL}/curso-gestion-materia-periodo/${id}/get-actividades`,
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

export const crearActividad = async (id:number,actividad:Actividad):Promise<ActividadResponse> => {
    const response = await fetch(
        `${Server.API_URL}/curso-gestion-materia-periodo/${id}/agregar-actividad`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${Storage.getStoredToken()}`,
            },
            body: JSON.stringify(actividad)
        }
    );
    return handleErrorResponse(response);
}

