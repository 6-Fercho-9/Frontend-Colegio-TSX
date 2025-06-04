import { API_URL, getStoredToken, handleErrorResponse } from "../authService";
import { categoria } from "../interfaces/CategoriaMateria";

export const getListCategoria = async (): Promise<categoria> => {
    const response = await fetch(`${API_URL}/categorias/get`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getStoredToken()}`,
        },
    });
		return await handleErrorResponse(response);
};

// export const updateCategoria = async (id: number, data: Partial<categoria>): Promise<categoria> => {
//     // const response = await fetch(`${API_URL}/categorias/update/${id}`, {
//     //     method: "PUT",
//     //     headers: {
//     //         "Content-Type": "application/json",
//     //         Authorization: `Bearer ${getStoredToken()}`,
//     //     },
//     //     body: JSON.stringify(data),
//     // });
//     // return await handleErrorResponse(response);
//     return null;
// }

// export const deleteCategoria = async (id: number): Promise<void> => {
// 	return null;
// }
