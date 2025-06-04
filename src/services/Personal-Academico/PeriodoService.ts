import { API_URL, getStoredToken, handleErrorResponse } from "../authService";
import { Periodo } from "../interfaces/Periodo";




export const getListPeriodos = async (): Promise<Periodo> => {
    const response = await fetch(`${API_URL}/periodos/get`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getStoredToken()}`,
        },
    });
        return await handleErrorResponse(response);
};

export const updatePeriodos = async (id: number, periodo: Periodo): Promise<Periodo> => {
    const response = await fetch(`${API_URL}/periodos/${id}/update`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getStoredToken()}`,
        },
        body: JSON.stringify(periodo),
    });
    return await handleErrorResponse(response);
};

export const deletePeriodos = async (id: number): Promise<void> => {
    const response = await fetch(`${API_URL}/periodos/${id}/delete`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getStoredToken()}`,
        },
    });
    return await handleErrorResponse(response);
};