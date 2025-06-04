import Server from "../API/server";
import { IntegranteCGMPAutoResponse } from "../Backend-Response/IntegranteCGMP";
import { AlumnoAutoEvaluacionCGMP} from "../interfaces/Aula-Estudiantil/IntegranteCGMP";
import Storage from "../JWT/Storage";
import { handleErrorResponse } from "../Utils/handles";


export const getIntegrantesPorCursoGestionMateriaPeriodo = async(id:number):Promise<AlumnoAutoEvaluacionCGMP> => {
    const response = await fetch(
        `${Server.API_URL}/curso-gestion-materia-periodo/${id}/get-integrantes`,
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

export interface NotaDTO{
    nota:number,
    ser:number,
    decidir:number
}

export const updateIntegranteAutoEvaluacion = async(alumno_id:number,cgmp_id:number,nota:NotaDTO):Promise<IntegranteCGMPAutoResponse> => {
    console.log(alumno_id,cgmp_id,nota)
    const response = await fetch(
        `${Server.API_URL}/curso-gestion-materia-periodo/${cgmp_id}/alumno/${alumno_id}/update-data`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${Storage.getStoredToken()}`,
            }
            ,body: JSON.stringify(nota)
        }

    );
    const data = await handleErrorResponse(response);
    return {
        message:data.message
    }
}

export const updateNotaVoletin = async(alumno_id:number,cgmp_id:number):Promise<IntegranteCGMPAutoResponse> => {
    const response = await fetch(
      `${Server.API_URL}/curso-gestion-materia-periodo/${cgmp_id}/alumno/${alumno_id}/update-voletin`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Storage.getStoredToken()}`,
        },
        
      }
    );
    const data = await handleErrorResponse(response);
    return {
      message: data.message,
    };
}