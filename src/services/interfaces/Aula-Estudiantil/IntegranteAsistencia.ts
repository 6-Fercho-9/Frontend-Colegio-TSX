import { IISimpleCursoGestionMateriaPeriodo } from "../Personal-Escolar/CursoGestionMateriaPeriodo";

export interface AlumnoAsistencia{
    id: number;
    nombre: string;
    ci: string;
    url_profile: string;
}

export interface Asistencia{
    id:number,
    participacion:number,
    presente:boolean,
    alumno:AlumnoAsistencia,
    
}

export interface AsistenciaListResponse{
    asistencias:Asistencia[],
    curso_gestion_materia_periodo:IISimpleCursoGestionMateriaPeriodo,
}