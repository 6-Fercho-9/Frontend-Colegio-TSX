import { API_URL, getStoredToken, handleErrorResponse } from "../authService";
import { PermisoPaginado } from "../interfaces/permiso";
import { Permiso, ResponseDefault } from "../interfaces/usuarios";

export const getPaginatedPermisos = async (page:number =1):Promise<PermisoPaginado> => {
  const response = await fetch(
    `${API_URL}/permisos/list-paginate?page=${page}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getStoredToken()}`,
      },
    }
  );
  return await handleErrorResponse(response);
}

export const createPermiso = async (nombre:string): Promise<ResponseDefault> => {
  console.log(`estoy entrando al metodo de crear permisos`)
  const response = await fetch(`${API_URL}/permisos/create`,{
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getStoredToken()}`,
    },
    body: JSON.stringify({ nombre }),
  })
  const data = await handleErrorResponse(response) 
  return {
    permiso: data.permiso,
    message: data.message
  }

}


export const deletePermiso = async (id: number): Promise<ResponseDefault> => {
  const response = await fetch(`${API_URL}/permisos/${id}/delete`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getStoredToken()}`,
    },
  });
  const data = await handleErrorResponse(response);
  return {
    message: data.message,
  };
};

export const updatePermiso = async (id: number, nombre: string): Promise<ResponseDefault> => {
  const response = await fetch(`${API_URL}/permisos/${id}/update`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getStoredToken()}`
    },
    body: JSON.stringify({ nombre })
  });

  const data = await handleErrorResponse(response);
  return {
    message: data.message,
    permiso:data.permiso
  };
};

export const getListPermisos = async (): Promise<Permiso[]> => {
  const response = await fetch(`${API_URL}/permisos/list`, {
    method:"GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getStoredToken()}`,
    },
  });
 console.log(response)
  const data = await handleErrorResponse(response);
  return data 
};