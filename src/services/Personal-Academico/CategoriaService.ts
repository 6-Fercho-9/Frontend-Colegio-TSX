import { API_URL, getStoredToken, handleErrorResponse } from "../authService";
import { categoria, materia } from "../interfaces/CategoriaMateria";

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

export const updateCategoria = async (): Promise<categoria> => {
	return null;
}

export const deleteCategoria = async (id: number): Promise<void> => {
	return null;
}
