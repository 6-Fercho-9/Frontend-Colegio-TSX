import Server from "../API/server";
import { ResponseDefault } from "../interfaces/usuarios";
import { handleErrorResponse } from "../Utils/handles";

export const getCodigoConfirmacion = async (email:string):Promise<ResponseDefault> => {
    const response = await fetch(`${Server.API_URL}/email/codigo`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify({email})
    })
    const data = await handleErrorResponse(response);
    return {
        message:data.message
    }
}

export const compararCodigoConfirmacion = async (email:string,codigo:string):Promise<ResponseDefault> => {
    const response = await fetch(`${Server.API_URL}/email/comparar-codigo`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify({email,codigo})
    })
    const data = await handleErrorResponse(response);
    return {
        message:data.message
    }
}

export const cambiarPassword = async (email:string,password:string):Promise<ResponseDefault> => {
    const response = await fetch(`${Server.API_URL}/email/change-password`,{
        method:"PUT",
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify({email,password})
    })
    const data = await handleErrorResponse(response);
    return {
        message:data.message
    }
}