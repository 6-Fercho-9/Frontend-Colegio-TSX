
export interface categoria{
    id: number;
    nombre: string;
    estado: string;
    materias: materia[];
}

export interface materia {
    id: number;
    nombre: string;
}