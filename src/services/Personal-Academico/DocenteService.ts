import Server from "../API/server";

import { DocenteAsignacion, DocentePaginado, DocenteList } from "../interfaces/Personal-Escolar/Docente";
import Storage from "../JWT/Storage";
import { handleErrorResponse } from "../Utils/handles";

export const getListDocentes = async (
  page: number = 1,
  per_page: number = 10
): Promise<DocentePaginado> => {
  const response = await fetch(
    `${Server.API_URL}/docentes/list-paginate?page=${page}&per_page=${per_page}`,
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

export const getListDocentesDisponibles = async () :Promise<DocenteAsignacion[]> =>{
  const response = await fetch(
    `${Server.API_URL}/docentes/list`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Storage.getStoredToken()}`,
      },
    }
  );
  return await handleErrorResponse(response);
}

export const getDocentes = async() : Promise<DocenteList> => {
  const response = await fetch(
    `${Server.API_URL}/docentes/get`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Storage.getStoredToken()}`,
      },
    }
  );
  return await handleErrorResponse(response);
}

export const updateDocente = async (id:number, nombre: string, email:string): Promise<{ message:string, id:number}> => {
  const response = await fetch(`${Server.API_URL}/docentes/${id}/update`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Storage.getStoredToken()}`,
    },
    body: JSON.stringify({ nombre, email}),
  });
  return await handleErrorResponse(response);
}

export const deleteDocente = async (id:number): Promise<{ message:string }> => {
  const response = await fetch(`${Server.API_URL}/docentes/${id}/delete`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Storage.getStoredToken()}`,
    },
  });
  return await handleErrorResponse(response);
}

export const createDocente = async (nombre: string, email:string, password:string, ci:string, edad:number, sexo:string): Promise<{ message:string, id:number}> => {
  const response = await fetch(`${Server.API_URL}/docentes/registrar`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Storage.getStoredToken()}`,
    },
    body: JSON.stringify({ nombre, email, ci, password, edad, sexo }),
  });
  return await handleErrorResponse(response);
}