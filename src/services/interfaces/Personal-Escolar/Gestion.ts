import { Meta } from "../Bitacora";

export interface Gestion{
    id : number,
    fecha_actualizacion: string,
    fecha_creacion: string,
    nombre:string,
    estado:string
}
export interface GestionAsignacion{
    id:number,
    nombre:string
}
export interface GestionPaginado{
    items:Gestion[],
    meta:Meta
}