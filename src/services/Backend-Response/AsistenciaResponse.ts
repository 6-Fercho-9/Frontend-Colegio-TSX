import { Asistencia } from "../interfaces/Aula-Estudiantil/IntegranteAsistencia";

export interface AsistenciaResponse{
    message?:string,
    asistencia?: Asistencia,
}