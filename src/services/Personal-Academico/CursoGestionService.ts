import Server from "../API/server"
import { MateriasCard } from "../interfaces/Personal-Escolar/CursoGestionMateria"
import { CursoGestionEdit } from "../interfaces/Personal-Escolar/CursoGestion"
import { ResponseDefault } from "../interfaces/usuarios"
import Storage from "../JWT/Storage"
import { handleErrorResponse } from "../Utils/handles"
import { SimpleCursoGestionMateriaPeriodo, CursoInscripcion } from "../interfaces/Personal-Escolar/CursoGestionMateriaPeriodo"


//PARA EL EDIT
export const get_curso_gestion_data = async (id:number): Promise<CursoGestionEdit> => {
    const response = await fetch(`${Server.API_URL}/curso-gestion/${id}/get`,{
        method:"GET",
        headers:{
            "Content-Type":"application/json",
            Authorization:`Bearer ${Storage.getStoredToken()}`
        }
    })
    return await handleErrorResponse(response);
}

interface UpdateCursoGestionDTO {
  total_aprobados: number;
  total_reprobados: number;
  total_abandono: number;
  estado: string;
}
export const updateCursoGestion = async (id:number,obj:UpdateCursoGestionDTO):  Promise<ResponseDefault> => {
    const response = await fetch(`${Server.API_URL}/curso-gestion/${id}/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Storage.getStoredToken()}`,
      },
      body:JSON.stringify({
        total_aprobados:obj.total_aprobados,
        total_reprobados:obj.total_reprobados,
        total_abandono:obj.total_abandono,
        estado:obj.estado
      })
    });
    const data = await handleErrorResponse(response);
    return {
        message:data.message
    }
}


export interface UploadIconoDTO{
    id:number,
    file:File
}
export const uploadIconCurso = async (cambioIconoDTO:UploadIconoDTO):Promise<ResponseDefault> => {
    const formData = new FormData()
    formData.append("imagen",cambioIconoDTO.file)
    const response = await fetch(`${Server.API_URL}/curso-gestion/${cambioIconoDTO.id}/upload-icon`,{
        method:"POST",
        headers:{
            Authorization: `Bearer ${Storage.getStoredToken()}`
        },
        body:formData
    })
    const data = await handleErrorResponse(response);
    return {
        message:data.message
    }

}

//para agregar o realizar una nueva asignacion
export const eliminarAsignacion = async (id:number):Promise<ResponseDefault> => {
     const response = await fetch(
       `${Server.API_URL}/curso-gestion/${id}/eliminar-asignacion`,
       {
         method: "DELETE",
         headers: {
           Authorization: `Bearer ${Storage.getStoredToken()}`,
         },
       }
     );
     const data = await handleErrorResponse(response);
     return {
       message: data.message,
     };
}

//para el listado de materias 
export const getMateriasParaCard = async (id:number): Promise<MateriasCard> => {
   const response = await fetch(`${Server.API_URL}/curso-gestion/${id}/materias`, {
     method: "GET",
     headers: {
       "Content-Type": "application/json",
       Authorization: `Bearer ${Storage.getStoredToken()}`,
     },
   });
   return await handleErrorResponse(response);
}


export const getPeriodosPorCursoGestionMateriaSeleccionado = async (id:number):
 Promise<SimpleCursoGestionMateriaPeriodo[]> => {
    const response = await fetch(`${Server.API_URL}/curso-gestion-materia/${id}/periodos`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Storage.getStoredToken()}`,
        },
    });
    return await handleErrorResponse(response);  
}


export const getMateriasInscritos = async (id:number):
  Promise<CursoInscripcion> => {
    const response = await fetch(`${Server.API_URL}/curso-gestion/${id}/materias-inscritas`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Storage.getStoredToken()}`,
      }
    });
    return await handleErrorResponse(response);
  }


  