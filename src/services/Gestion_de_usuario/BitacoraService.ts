import { API_URL, getStoredToken, handleErrorResponse } from "../authService";
import { BitacoraPaginada } from "../interfaces/Bitacora";

export const getBitacoras = async (
  page: number = 1
): Promise<BitacoraPaginada> => {
  const response = await fetch(
    `${API_URL}/bitacoras-usuarios/list-paginate?page=${page}`,
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
