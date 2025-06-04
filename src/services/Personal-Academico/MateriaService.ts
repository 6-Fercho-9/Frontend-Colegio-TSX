import Server from "../API/server";
import { MateriaResponse } from "../Backend-Response/MateriaResponse";
import { SimpleCursoGestionMateria } from "../interfaces/Personal-Escolar/Curso";

import { MateriaAsignacion, MateriaPaginada } from "../interfaces/Personal-Escolar/Materia";
import Storage from "../JWT/Storage";
import { handleErrorResponse } from "../Utils/handles";

export const getListMateria = async (
  page: number = 1,
  per_page: number = 10
): Promise<MateriaPaginada> => {
  const response = await fetch(
    `${Server.API_URL}/materias/list-paginate?page=${page}&per_page=${per_page}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Storage.getStoredToken()}`,
      },
    }
  );
  return await handleErrorResponse(response);
};



// Crear materia
export const createMateria = async (nombre: string): Promise<MateriaResponse> => {
  const response = await fetch(`${Server.API_URL}/materias/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Storage.getStoredToken()}`,
    },
    body: JSON.stringify({ nombre }),
  });

  const data = await handleErrorResponse(response);
  return {
    message: data.message,
    materia: data.materia,
  };
};

// Eliminar materia
export const deleteMateria = async (id: number): Promise<MateriaResponse> => {
  const response = await fetch(`${Server.API_URL}/materias/${id}/delete`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${Storage.getStoredToken()}`
    }
  });

  const data = await handleErrorResponse(response);
  return {
    message: data.message
  };
};

// Actualizar materia
export const updateMateria = async (id: number, nombre: string,estado:string): Promise<MateriaResponse> => {
  const response = await fetch(`${Server.API_URL}/materias/${id}/update`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Storage.getStoredToken()}`
    },
    body: JSON.stringify({ nombre ,estado})
  });

  const data = await handleErrorResponse(response);
  return {
    message: data.message,
    materia: data.materia
  };
};

//para obtener la lista entera de las materia, esto sirve para el filtrador
export const listMaterias = async ():Promise<MateriaAsignacion[]> => {
  const response =await fetch(`${Server.API_URL}/materias/list`,{
    method:"GET",
    headers:{
      "Content-Type":"application/json",
      Authorization: `Bearer ${Storage.getStoredToken()}`
    },
  })
  return await handleErrorResponse(response);
}

export const listMateriasToTable = async(gestion_id:number,curso_id:number): Promise<SimpleCursoGestionMateria[]> => {
  const response = await fetch(`${Server.API_URL}/gestiones/${gestion_id}/curso/${curso_id}/get-materias`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Storage.getStoredToken()}`,
    },
  });
  return await handleErrorResponse(response);
}
// export const listMateriasForTable = async(): Promise
