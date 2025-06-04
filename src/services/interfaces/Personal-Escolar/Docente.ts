import { Meta } from "../Bitacora";

export interface Docente{
    id : number,
    ci:string,
    correo:string,
    url_profile:string
    fecha_actualizacion: string,
    fecha_creacion: string,
    nombre:string,
    estado:string
}
export interface DocentePaginado{
    items:Docente[],
    meta:Meta
}

export interface DocenteCard {
  id: number;
  ci: string;
  email: string;
  url_profile: string;
  nombre: string;
}

export interface DocenteAsignacion{
    id:number,
    nombre:string
}

export interface DocenteList {
    id: number;
    ci: string;
    email: string;
    nombre: string;
    estado: string;
    edad: number;
    sexo: string;
}