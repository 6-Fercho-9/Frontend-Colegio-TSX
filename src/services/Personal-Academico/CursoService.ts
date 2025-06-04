import Server from "../API/server";

import { CursoAsignacion, CursoPaginado } from "../interfaces/Personal-Escolar/Curso";
import Storage from "../JWT/Storage";
import { CursoResponse } from "../Backend-Response/CursoResponse";
import { handleErrorResponse } from "../Utils/handles";

export const getListCursos = async (page:number = 1, per_page:number = 10): Promise<CursoPaginado> => {
    const response = await fetch(`${Server.API_URL}/cursos/list-paginate?page=${page}&per_page=${per_page}`,
        {
            method:"GET",
            headers:{
                "Content-Type": "application/json",
                Authorization: `Bearer ${Storage.getStoredToken()}`
            }
        }
    )
    return await handleErrorResponse(response);
} 

export const getCompleteList = async (): Promise<CursoAsignacion[]> => {
  const response = await fetch(`${Server.API_URL}/cursos/list`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Storage.getStoredToken()}`,
    },
  });
  return await handleErrorResponse(response);
};

export const createCurso = async (nombre: string,turno:string,grado:number): Promise<CursoResponse> =>{
  const response = await fetch(`${Server.API_URL}/cursos/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Storage.getStoredToken()}`,
    },
    body: JSON.stringify({ nombre ,turno,grado}),
  });
  const data = await handleErrorResponse(response)
  return {
    message:data.message,
    curso: data.curso
  }
};


export const deleteCurso = async (id:number):Promise<CursoResponse> => {
  const response = await fetch(`${Server.API_URL}/cursos/${id}/delete`,{
    method: "DELETE",
    headers:{
      Authorization:`Bearer ${Storage.getStoredToken()}`
    }
  })
  const data = await handleErrorResponse(response)
  return {
    message: data.message
  }
}

export const updateCurso = async (id: number, nombre: string,turno:string,estado:string,grado:number): Promise<CursoResponse> => {
  const response = await fetch(`${Server.API_URL}/cursos/${id}/update`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Storage.getStoredToken()}`
    },
    body: JSON.stringify({ nombre ,turno,estado,grado})
  });

  const data = await handleErrorResponse(response);
  return {
    message: data.message,
    curso:data.curso
  };
};

