//import axios from "axios";
import { API_URL, getStoredToken, handleErrorResponse } from "../authService";
import { AuthResponse, ResponseDefault, UsuarioPaginado, UsuarioUpdateRequest } from "../interfaces/usuarios";
import { AlumnoPaginado } from "../interfaces/Alumno";

export const updateUserProfile = async (data: {
  nombre: string;
  username: string;
  email: string;
  // rol_id: number;
  ci:string;
}): Promise<AuthResponse> => {
    console.log(`data: ${JSON.stringify(data)}`)
  try {
    console.log('intentando actualizar..usuario ')
    const response = await fetch(`${API_URL}/usuarios/edit`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getStoredToken()}`,
      },
      body: JSON.stringify(data),
    });

    const result = await handleErrorResponse(response);
    console.log("Usuario actualizado:", result.usuario);
    return {
      user:result.usuario
    } as AuthResponse;
  } catch (error) {
    console.error("Error actualizando usuario:", error);
    throw error;
  }
};

//cambio de contrasenias
// usuarioService.ts
export const cambiarContrasenia = async (actual: string, nueva: string):Promise<ResponseDefault> => {
  const response = await fetch(`${API_URL}/usuarios/change-password`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getStoredToken()}`,
    },
    body: JSON.stringify({ anterior_password: actual,nueva_password: nueva }),
    
  });

  const data = await handleErrorResponse(response);
  return {message:data.message}; // o lo que devuelva tu backend
};


export const adminCambiarContrasenia = async (id:number,nueva: string):Promise<ResponseDefault> => {
  const response = await fetch(`${API_URL}/usuarios/${id}/change-password`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getStoredToken()}`,
    },
    body: JSON.stringify({nueva_password: nueva }),
    
  });

  const data = await handleErrorResponse(response);
  return {message:data.message}; // o lo que devuelva tu backend
};



export const adminCambiarPerfil = async (id:number,file: File):Promise<ResponseDefault> => {
  const formData = new FormData();
  formData.append("imagen", file); 
  const response = await fetch(`${API_URL}/usuarios/${id}/update-profile`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${getStoredToken()}`,
    },
    body: formData,
  });

  const data = await handleErrorResponse(response);
  return {message:data.message}; // o lo que devuelva tu backend
};

export const cambiarFotoDePerfil = async (file:File): Promise<AuthResponse> => {
  const formData = new FormData();
  formData.append("imagen", file); // el nombre "foto" debe coincidir con el que espera el backend
  const response = await fetch(`${API_URL}/usuarios/upload-profile-photo`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getStoredToken()}`,
    },
    //credentials: "include" //permite enviar y recibir cookies
    body:formData
  });

  const data = await handleErrorResponse(response);
  return {
    message: data.message,
    user: data.usuario,
  } as AuthResponse;
};

export const getPaginatedListUsers = async (page:number = 1):Promise<UsuarioPaginado> => {
  
  const response = await fetch(`${API_URL}/usuarios/list-paginate?page=${page}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${getStoredToken()}`,
      // 'Content-Type' NO se especifica, fetch lo hace automáticamente para FormData
    },
  });
  return await handleErrorResponse(response);
};

export const getAlumnosByCurso = async (cursoGestion: number):Promise<AlumnoPaginado> => {
  const response = await fetch(`${API_URL}/curso-gestion/${cursoGestion}/integrantes/list`, {
    method: "GET",
    headers: {
      "Content-Type":"application/json",
      Authorization: `Bearer ${getStoredToken()}`,
    },
  });
  return await handleErrorResponse(response);
}


//para admin


export const adminGetUserMethod = async (id:number): Promise<ResponseDefault> => {
const response = await fetch(`${API_URL}/usuarios/${id}/get`, {
  method: "GET",
  headers: {
    Authorization: `Bearer ${getStoredToken()}`,
    "Content-Type": "application/json"
  },
}); 
  const data =  await handleErrorResponse(response)
  return {
    message:data.message,
    usuario:data.usuario
  }
} 

export const adminDeleteUserMethod = async (id:number): Promise<ResponseDefault> => {
  const response = await fetch(`${API_URL}/usuarios/${id}/delete`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getStoredToken()}`,
      "Content-Type": "application/json",
    },
  });
  const data = await handleErrorResponse(response)
  return {
    message:data.message
  }
}

export const adminEditUserMethod = async (id:number,usuario:UsuarioUpdateRequest):Promise<AuthResponse> => {
  console.log(usuario)
  const response = await fetch(`${API_URL}/usuarios/${id}/update`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${getStoredToken()}`,
      "Content-Type": "application/json",
    },
    body:JSON.stringify(usuario)
  });
  const data = await handleErrorResponse(response);
  return {
    message: data.message,
    user: data.usuario
  };
}
