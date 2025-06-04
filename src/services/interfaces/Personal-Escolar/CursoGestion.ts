import { Meta } from "../Bitacora";
import { CursoAsignacion } from "./Curso";
import { GestionAsignacion } from "./Gestion";

//quizas no se usa
export interface CursoGestionPaginado {
  items: CursoGestion[];
  meta: Meta;
}

// Curso gestion
// para el card de curso gestion
export interface CursoGestion{
    id:number,
    estado:string,
    curso:CursoAsignacion
    url_image:string
}
//cuando se presiona sobre  curso
export interface CursoGestionEdit {
  id: number;
  estado: string;
  total_aprobados:number,
  total_reprobados:number,
  curso: CursoAsignacion,
  gestion:GestionAsignacion,
  total_abandono: number,
  url_image:string
}


export interface SimpleCursoGestion {
  id: number;
  curso: CursoAsignacion;
  gestion: GestionAsignacion;
}