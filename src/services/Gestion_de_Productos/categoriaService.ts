import { API_URL, getStoredToken, handleErrorResponse } from "../authService";
import { Categoria, CategoriaPaginado } from "../interfaces/categoria";
import { ResponseDefault } from "../interfaces/usuarios";



export const getPaginatedCategorias = async (
  page: number = 1
): Promise<CategoriaPaginado> => {
  const response = await fetch(
    `${API_URL}/categorias/list-paginate?page=${page}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getStoredToken()}`,
      },
    }
  );
  return await handleErrorResponse(response);
};


// categoriaService.ts

export const updateCategoria = async (id: number, nombre: string): Promise<ResponseDefault> => {
  const response = await fetch(`${API_URL}/categorias/${id}/update`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getStoredToken()}`,
    },
    body: JSON.stringify({ nombre }),
  });
  const data = await handleErrorResponse(response);
  return {
    message: data.message,
    categoria:data.categoria
  }
};

export const deleteCategoria = async (id: number) => {
  const response = await fetch(`${API_URL}/categorias/${id}/delete`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getStoredToken()}`,
    },
  });
  return await handleErrorResponse(response);
};


export const createCategoria = async (nombre: string): Promise<ResponseDefault> => {
  console.log(`estoy entrando al metodo de crear marcas`);
  const response = await fetch(`${API_URL}/categorias/create`, {
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
    categoria: data.categoria,
  };
};



export const getAllCategoria = async (): Promise<Categoria[]> => {
  const response = await fetch(`${API_URL}/categorias/list`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${getStoredToken()}`,
    },
  });
  const data = await handleErrorResponse(response);
  return data;
};