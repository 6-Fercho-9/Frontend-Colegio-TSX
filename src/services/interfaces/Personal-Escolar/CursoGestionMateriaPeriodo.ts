


import { CursoGestionMateria, IISimpleCursoGestionMateria} from "./CursoGestionMateria";
import { Periodo } from "./Periodo";


// curso gestion materia periodo


export interface SimpleCursoGestionMateriaPeriodo {
  id: number;
  estado: string;
  curso_gestion_materia: CursoGestionMateria;
  periodo: Periodo;
}

export interface CursoGestionMateriaPeriodo extends SimpleCursoGestionMateriaPeriodo {
  cantidad_clases:number,
  cantidad_examanes:number,
  cantidad_exposiciones:number,
  cantidad_practicos:number,
  cantidad_tareas:number,
}


export interface CursoInscripcion {
  cantidad_total_cupos: number;
  cantidad_total_inscritos: number;
  fecha_inicio: Date;
  fecha_fin: Date;
}

export interface IISimpleCursoGestionMateriaPeriodo {
  id: number;
  curso_gestion_materia: IISimpleCursoGestionMateria;
  periodo: Periodo;
}