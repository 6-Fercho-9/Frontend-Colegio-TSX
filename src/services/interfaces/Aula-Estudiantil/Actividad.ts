import { IISimpleCursoGestionMateriaPeriodo } from "../Personal-Escolar/CursoGestionMateriaPeriodo";

export interface Actividad {
    descripcion: string;
    fecha_fin:string;
    tipo_actividad_id:number,
    titulo:string,
    valor:number,
    id:number
}


export interface ListActividadResponse{
    actividades: Actividad[];
    curso_gestion_materia_periodo:IISimpleCursoGestionMateriaPeriodo ;
}