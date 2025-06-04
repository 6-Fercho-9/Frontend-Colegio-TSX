
import { SimpleCursoGestion } from "./CursoGestion";
import { DocenteCard } from "./Docente";
import { MateriaAsignacion } from "./Materia";


//para el curso gestion materia
//para el listado 
export interface MateriasCard {
  curso_gestion: SimpleCursoGestion;
  materias: CursoGestionMateriaCard[];
}

export interface CursoGestionMateriaCard {
  id: number;
  estado: string;
  materia: MateriaAsignacion;
  url_image: string;
}
///////////////////////////////////////////////////////////////////////////

export interface SimpleCursoGestionMateria{
    curso_gestion: SimpleCursoGestion,
    id:number,
    materia:MateriaAsignacion
    //horarios posibles
}
// es como objtener el curso gestion materia mas
export interface CursoGestionMateria extends SimpleCursoGestionMateria{
  cantidad_aprobados: number,
  cantidad_reprobados: number,
  cantidad_abandono: number,
  docente: DocenteCard,
  url_image: string,
}


export interface IISimpleCursoGestionMateria {
  curso_gestion: SimpleCursoGestion;
  id: number;
  materia: MateriaAsignacion;
  docente:DocenteCard
  //horarios posibles
}