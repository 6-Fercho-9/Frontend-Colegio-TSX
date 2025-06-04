import Server from "../API/server";
import { MateriaEditObject } from "../interfaces/Personal-Escolar/Curso";
import Storage from "../JWT/Storage";
import { handleErrorResponse } from "../Utils/handles";

export const getMateriaCompletaById = async (id:number):Promise<MateriaEditObject> => {
    const response = await fetch(`${Server.API_URL}/curso-gestion-materia/${id}/get`,{
        method:"GET",
        headers:{
            "Content-Type":"application/json",
            Authorization:`Bearer ${Storage.getStoredToken()}`
        }
    })
    return handleErrorResponse(response)
}