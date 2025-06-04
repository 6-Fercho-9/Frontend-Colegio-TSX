import { Error } from "../interfaces/usuarios";

export const handleErrorResponse = async (response: Response) => {
  const data = await response.json();
  if (!response.ok) {
    throw {
      message: data.message || "Error en la solicitud",
      error: data.error || "Código Desconocido",
      fecha: data.fecha || new Date().toISOString(),
    } as Error;
  }
  console.log(`estoy en el servicio stringfy ${JSON.stringify(data)}`);
  //console.log(`data usuario ${data.email}, data mensaje ${data.nombre}`);
  console.log(data);
  return data;
};

