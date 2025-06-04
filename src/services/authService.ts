
import { AuthResponse, Error } from "./interfaces/usuarios";

//export const API_URL: string = "https://sw-backend-python-flask.onrender.com/api";
export const API_URL: string = "http://127.0.0.1:8000/api";


export const TOKEN: string = "token";

export const CLOUD_NAME: string = "ddmdsfcvf" //////////

export const CLOUDINARY_URL:string = `https://res.cloudinary.com/${CLOUD_NAME}/image/upload`



export const storeToken = (token: string) => {
  localStorage.setItem(TOKEN, token);
};

export const getStoredToken = () => {
  return localStorage.getItem(TOKEN);
};

export const revokeToken = () => {
  return localStorage.removeItem(TOKEN);
};

// Definir una interfaz para el error personalizado

// Función genérica para manejar errores
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



// Función de login
export const login = async (email: string, password: string): Promise<AuthResponse> => {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      //credentials: "include" //permite enviar y recibir cookies
    });
    
    const data = await handleErrorResponse(response);
    storeToken(data.token);
    return {
      user: data.usuario,
      token: data.token,
      message: data.message
    } as AuthResponse;

  } catch (error) {
    console.error("Error en checkAuth:", error);
    throw error;
  }
};

// Función de signup
export const signup = async (nombre: string, email: string, password: string): Promise<AuthResponse> => {
  try {
    const response = await fetch(`${API_URL}/auth/registrar`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({nombre, email, password }),
    });
    const data = await handleErrorResponse(response);
    //solamente retorna el usuario
    return {
      user: data.usuario
    } as AuthResponse;
  } catch (error) {
    console.error("Error en checkAuth:", error);
    throw error;
  }
};

// Función para verificar autenticación
export const checkAuth = async (): Promise<AuthResponse> => {
  try {
    const response = await fetch(`${API_URL}/auth/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${getStoredToken()}`,
        //credentials: "include" //permite enviar y recibir cookies
      },
    });
    const data = await handleErrorResponse(response);
    console.log(` checkAuth ${JSON.stringify(data)}`)
    return {
      user: data.usuario
    } as AuthResponse;
  } catch (error) {
    console.error("Error en checkAuth:", error);
    throw error;
  }
};



export const logout = async (): Promise<AuthResponse> => {
  
    const response = await fetch(`${API_URL}/auth/logout`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        Authorization: `Bearer ${getStoredToken()}`,
       },
      //credentials: "include" //permite enviar y recibir cookies
    });
    
    const data = await handleErrorResponse(response);
    return {
      message: data.message
    } as AuthResponse;

  
};



