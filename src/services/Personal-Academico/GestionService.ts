import Server from "../API/server";
import { GestionResponse } from "../Backend-Response/GestionResponse";
import { CursoGestion } from "../interfaces/Personal-Escolar/CursoGestion";

import { GestionAsignacion, GestionPaginado } from "../interfaces/Personal-Escolar/Gestion";
import Storage from "../JWT/Storage";
import { handleErrorResponse } from "../Utils/handles";

export const getListGestion = async (
  page: number = 1,
  per_page: number = 10
): Promise<GestionPaginado> => {
  const response = await fetch(
    `${Server.API_URL}/gestiones/list-paginate?page=${page}&per_page=${per_page}`,
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

export const getCompleteList = async ():Promise<GestionAsignacion[]> => {
  const response = await fetch(`${Server.API_URL}/gestiones/list`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Storage.getStoredToken()}`,
    }
  });
  return await handleErrorResponse(response);
}


// Crear gestión
export const createGestion = async (nombre: string): Promise<GestionResponse> => {
  const response = await fetch(`${Server.API_URL}/gestiones/create`, {
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
    gestion: data.gestion,
  };
};

// Eliminar gestión
export const deleteGestion = async (id: number): Promise<GestionResponse> => {
  const response = await fetch(`${Server.API_URL}/gestiones/${id}/delete`, {
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

// Actualizar gestión
export const updateGestion = async (id: number, nombre: string,estado:string): Promise<GestionResponse> => {
  const response = await fetch(`${Server.API_URL}/gestiones/${id}/update`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Storage.getStoredToken()}`
    },
    body: JSON.stringify({ nombre,estado })
  });

  const data = await handleErrorResponse(response);
  return {
    message: data.message,
    gestion: data.gestion
  };
};

// export const getCursosByGestion = async (gestion_id:number):Promise<CursoGestionPaginado> => {
export const getCursosByGestion = async (gestion_id:number):Promise<CursoGestion[]> => {
  const response = await fetch(`${Server.API_URL}/gestiones/${gestion_id}/get-cursos`,{
    method:"GET",
    headers:{
      "Content-Type":"application/json",
      Authorization:`Bearer ${Storage.getStoredToken()}`
    }
  });
  return await handleErrorResponse(response);

}

export const asignarCursoAGestion = async (gestion_id:number,curso_id:number): Promise<GestionResponse> => {
  console.log(`gestion id: ${gestion_id}`)
  console.log(`curso id: ${curso_id}`);
    const response = await fetch(
      `${Server.API_URL}/gestiones/${gestion_id}/curso/${curso_id}/asignar`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Storage.getStoredToken()}`,
        },
      }
    );
    const data = await handleErrorResponse(response);
    return {
      message:data.message
    }
}


