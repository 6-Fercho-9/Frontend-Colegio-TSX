import { API_URL, getStoredToken, handleErrorResponse } from "../authService";
import { MarcaPaginado } from "../interfaces/marca";
import { ResponseDefault } from "../interfaces/usuarios";
import { Marca } from "../interfaces/marca";

export const getPaginatedMarca = async (page:number =1):Promise<MarcaPaginado> => {
  const response = await fetch(
    `${API_URL}/marcas/list-paginate?page=${page}`,
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

export const deleteMarca = async (id: number): Promise<ResponseDefault> => {
  const response = await fetch(`${API_URL}/marcas/${id}/delete`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getStoredToken()}`
    }
  });
  const data = await handleErrorResponse(response);
  return { message: data.message };
};

export const updateMarca = async (id: number, nombre: string): Promise<ResponseDefault> => {
  const response = await fetch(`${API_URL}/marcas/${id}/update`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getStoredToken()}`
    },
    body: JSON.stringify({ nombre })
  });
  const data = await handleErrorResponse(response);
  return { message: data.message,
          marca:data.marca};
};


export const createMarca = async (nombre: string): Promise<ResponseDefault> => {
  console.log(`estoy entrando al metodo de crear marcas`);
  const response = await fetch(`${API_URL}/marcas/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getStoredToken()}`,
    },
    body: JSON.stringify({ nombre }),
  });
  const data = await handleErrorResponse(response);
  return {
    message: data.message,
    marca: data.marca,
  };
};


export const getAllMarca = async (): Promise<Marca[]> => {
  const response = await fetch(`${API_URL}/marcas/list`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${getStoredToken()}`,
    },
  });
  const data = await handleErrorResponse(response);
  return data;
};
