import Server from "../API/server";
import { AsistenciaResponse } from "../Backend-Response/AsistenciaResponse";
import {  AsistenciaListResponse } from "../interfaces/Aula-Estudiantil/IntegranteAsistencia";
import Storage from "../JWT/Storage";
import { handleErrorResponse } from "../Utils/handles";

export const getAsistencias = async(id:number): Promise<AsistenciaListResponse> => {
    const response = await fetch(
        `${Server.API_URL}/curso-gestion-materia-periodo/${id}/get-asistencia`,
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

export interface AsistenciaDTO{
    id:number,
    presente:boolean,
    participacion:number
}
export const guardarCambios = async(asistencia:AsistenciaDTO[]) : Promise<AsistenciaResponse> => {
    const response = await fetch(
        `${Server.API_URL}/asistencias/update-asistencia`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${Storage.getStoredToken()}`,
            },
            body: JSON.stringify(asistencia)
        }
    );
    const data = await handleErrorResponse(response);
    return {
        message:data.message
    }
}
