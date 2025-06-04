import { API_URL, getStoredToken, handleErrorResponse } from "../authService";
import { Producto, ProductoPaginado } from "../interfaces/producto";
import { ResponseDefault } from "../interfaces/usuarios";

export const createProduct = async (producto:Producto):Promise<ResponseDefault> => {
    const response = await fetch(`${API_URL}/productos/create`,{
        method:"POST",
        headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${getStoredToken()}`
        },
        body: JSON.stringify(producto)
    })
    const data =await handleErrorResponse(response)
    return {
        message:data.message
    }
}



export const getProduct = async (id:number):Promise<ResponseDefault> => {
    const response = await fetch(`${API_URL}/productos/${id}/get`,{
        method:"GET",
        headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${getStoredToken()}`
        },
    })
    const data =await handleErrorResponse(response)
    return {
        producto:data.producto
    }
}

export const updateProduct = async (id:number,producto:Producto):Promise<ResponseDefault> => {
    const response = await fetch(`${API_URL}/productos/${id}/update`,{
        method:"PUT",
        headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${getStoredToken()}`
        },
        body: JSON.stringify(producto)
    })
    const data =await handleErrorResponse(response)
    return {
        message:data.message
    }
}

export const deleteProduct = async (id:number):Promise<ResponseDefault> => {
    const response = await fetch(`${API_URL}/productos/${id}/delete`,{
        method:"DELETE",
        headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${getStoredToken()}`
        },
    })
    const data =await handleErrorResponse(response)
    return {
        message:data.message
    }
}


export const getPaginatedListProduct = async (page:number = 1):Promise<ProductoPaginado> => {
  
  const response = await fetch(`${API_URL}/productos/list-paginate?page=${page}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${getStoredToken()}`,
      // 'Content-Type' NO se especifica, fetch lo hace automáticamente para FormData
    },
  });
  return await handleErrorResponse(response);
};
