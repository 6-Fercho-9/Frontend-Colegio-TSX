import { Meta } from "../Bitacora";
import { SimpleCursoGestion } from "./CursoGestion";

//import { CursoGestion } from "./CursoGestion";
import { DocenteCard } from "./Docente";

import { Horario } from "./Horario";
import { MateriaAsignacion } from "./Materia";


export interface Curso{
    id : number,
    fecha_actualizacion: string,
    fecha_creacion: string,
    grado:number,
    nombre:string,
    turno:string,
    estado:string
}

export interface CursoPaginado{
    items:Curso[],
    meta:Meta
}

export interface CursoAsignacion{
    id:number,
    nombre:string
}


// export interface CursoGestion{
//     id:number,
//     estado:string,
//     // total_aprobados:number,
//     // total_reprobados:number,
//     curso:CursoAsignacion
//     // total_abandono: number,
//     url_image:string
// }
// //cuando se presiona sobre un curso
// export interface CursoGestionEdit {
//   id: number;
//   estado: string;
//   total_aprobados:number,
//   total_reprobados:number,
//   curso: CursoAsignacion,
//   gestion:GestionAsignacion,
//   total_abandono: number,
//   url_image:string
// }


//parece que no lo utilizo este
// export interface CursoGestionPaginado{
//     items:CursoGestion[],
//     meta:Meta
// }


//para el curso gestion materia
//creo que no se usara
export interface SimpleCursoGestionMateria {
  id: number;
  estado: string;
  materia:MateriaAsignacion
}


// export interface CursoGestionCardAux{
//     id:number,
//     curso:CursoAsignacion,
//     gestion:GestionAsignacion
// }
// //para el curso gestion materia
// export interface MateriasCard{
//     curso_gestion:CursoGestionCardAux
//     materias: CursoGestionMateriaCard[],
// }


// export interface CursoGestionMateriaCard {
//   id: number;
//   estado: string;
//   materia: MateriaAsignacion;
//   url_image: string;
// }



//para la data de la materia que tiene horario, y demas cosas

export interface MateriaEditObject {
  cantidad_abandono: number,
  cantidad_aprobados: number,
  cantidad_reprobados: number,
  curso_gestion: SimpleCursoGestion,
  docente:DocenteCard,
  estado:string,
  id:number,
  materia:MateriaAsignacion,
  horario:Horario[],
  url_image:string,
}



// export interface CursoGestionMateria{
  
// }
// // curso gestion materia periodo 
// export interface CursoGestionMateriaPeriodo {
//   cantidad_clases:number,
//   cantidad_examanes:number,
//   cantidad_exposiciones:number,
//   cantidad_practicos:number,
//   cantidad_tareas:number,
//   id:number,
//   periodo:Periodo
//   estado:string,

// }

export interface MateriaInscritos {
  cantidad_total_cupos: number;
  cantidad_total_inscritos: number;
  fecha_inicio: Date;
  fecha_fin: Date;
}