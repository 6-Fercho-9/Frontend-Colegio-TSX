
import { IISimpleCursoGestionMateriaPeriodo } from "../Personal-Escolar/CursoGestionMateriaPeriodo";

export interface AlumnoAutoEvaluacion {
  id: number;
  nombre: string;
  ci:string;
  nota: number | null;
  ser: number | null;
  decidir: number | null;
  url_profile: string;
}
export interface AlumnoAutoEvaluacionCGMP {
    curso_gestion_materia_periodo:IISimpleCursoGestionMateriaPeriodo ,
    integrantes: AlumnoAutoEvaluacion[],
}