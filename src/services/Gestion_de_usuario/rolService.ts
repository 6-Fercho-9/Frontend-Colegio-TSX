import { API_URL, getStoredToken, handleErrorResponse } from "../authService";
import { RolPaginado } from "../interfaces/rol";
import { ResponseDefault, Rol } from "../interfaces/usuarios";





// Servicio para obtener los roles
export const getListRoles = async (): Promise<Rol[]> => {
  const response = await fetch(`${API_URL}/rol/list`, {
    method:"GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getStoredToken()}`,
    },
  });
 console.log(response)
  const data = await handleErrorResponse(response);
  return data as Rol[]
};

export const getPaginatedRoles = async (page:number =1):Promise<RolPaginado> => {
  const response = await fetch(
    `${API_URL}/rol/list-paginate?page=${page}`,
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


export const createRol = async (nombre: string): Promise<ResponseDefault> =>{
  console.log(`estoy entrando al metodo de crear roles`);
  const response = await fetch(`${API_URL}/rol/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getStoredToken()}`,
    },
    body: JSON.stringify({ nombre }),
  });
  const data = await handleErrorResponse(response)
  return {
    message:data.message,
    rol: data.rol
  }
};


export const deleteRol = async (id:number):Promise<ResponseDefault> => {
  const response = await fetch(`${API_URL}/rol/${id}/delete`,{
    method: "DELETE",
    headers:{
      Authorization:`Bearer ${getStoredToken()}`
    }
  })
  const data = await handleErrorResponse(response)
  return {
    message: data.message
  }
}


export const updateRol = async (id: number, nombre: string): Promise<ResponseDefault> => {
  const response = await fetch(`${API_URL}/rol/${id}/update`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getStoredToken()}`
    },
    body: JSON.stringify({ nombre })
  });

  const data = await handleErrorResponse(response);
  return {
    message: data.message,
    rol:data.rol
  };
};


export const getRol = async (id: number): Promise<ResponseDefault> => {
  const response = await fetch(`${API_URL}/rol/${id}/get`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getStoredToken()}`
    },
  });

  const data = await handleErrorResponse(response);
  return {
    message: data.message,
    rol:data.rol
  };
};


//asignar roles

export const asignarPermisosToRol = async (idRol:number,idPermiso:number):Promise<ResponseDefault> => {
   const response = await fetch(`${API_URL}/rol/${idRol}/permiso/${idPermiso}/asignar`, {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
       Authorization: `Bearer ${getStoredToken()}`,
     },
   });

   const data = await handleErrorResponse(response);
   return {
     message: data.message,
   };
}

export const eliminarPermisosToRol = async (idRol:number,idPermiso:number):Promise<ResponseDefault> => {
   const response = await fetch(`${API_URL}/rol/${idRol}/permiso/${idPermiso}/eliminar`, {
     method: "DELETE",
     headers: {
       "Content-Type": "application/json",
       Authorization: `Bearer ${getStoredToken()}`,
     },
   });

   const data = await handleErrorResponse(response);
   return {
     message: data.message,
   };
}
