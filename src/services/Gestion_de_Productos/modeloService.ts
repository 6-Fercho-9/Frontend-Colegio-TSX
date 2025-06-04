import { API_URL, getStoredToken, handleErrorResponse } from "../authService";
import {ModeloPaginado, ModeloProducto, ModeloRequest} from "../interfaces/modelo"
import { ResponseDefault } from "../interfaces/usuarios";


export const getPaginatedModelos = async (page:number =1):Promise<ModeloPaginado> => {
  const response = await fetch(
    `${API_URL}/modelos/list-paginate?page=${page}`,
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

export const deleteModelo = async (id: number): Promise<ResponseDefault> => {
  const response = await fetch(`${API_URL}/modelos/${id}/delete`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getStoredToken()}`
    }
  });
  const data = await handleErrorResponse(response);
  return { message: data.message };
};



export const updateModelo = async (modelo: ModeloRequest): Promise<ResponseDefault> => {
  const response = await fetch(`${API_URL}/modelos/${modelo.id}/update`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getStoredToken()}`
    },
    body: JSON.stringify(modelo)
  });
  const data = await handleErrorResponse(response);
  return { message: data.message,
          modelo: data.modelo
   };
};


export const createModelo = async (modelo: ModeloRequest): Promise<ResponseDefault> => {
  const response = await fetch(`${API_URL}/modelos/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getStoredToken()}`
    },
    body: JSON.stringify(modelo)
  });
  const data = await handleErrorResponse(response);
  return { message: data.message,
          modelo: data.modelo
   };
};

export const listModelos = async ():Promise<ModeloProducto[]> => {
  const response = await fetch(`${API_URL}/modelos/list`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getStoredToken()}`,
    },
  });
  const data = await handleErrorResponse(response)
  return data
}

