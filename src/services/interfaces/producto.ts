// import { Caracteristica } from "./caracteristica";

import { Meta } from "./Bitacora";
import { CaracteristicaResponseUpdateBackend } from "./caracteristica";

export interface Producto {
  stock: number;
  precio: number;
  tiempo_garantia: string;
  descripcion: string;
  modelo_id: number;
  media_puntaje?: number;
  estado?: string;
  //caracteristica: Caracteristica
  ram?: string;
  almacenamiento?: string;
  sistema_operativo?: string;
  conectividad?: string;
  puertos?: string;
  camara?: string;
  procesador?: string;
  bateria?: string;
  tarjeta_grafica?: string;
  microfono_integrado?: boolean;
  modelo?: string;
  dimension?: string;
  peso?: string;
  pantalla?: string;
  resolucion?: string;
  color: string; // requerido
}

export interface ProductoResponseUpdateBackend {
  id: number;
  stock: number;
  precio: number;
  tiempo_garantia: string;
  descripcion: string;
  modelo_id: number;
  media_puntaje: number;
  estado: string;
  modelo:{
    id:number
    nombre:string
    categoria:{
        nombre:string
    }
    marca:{
        nombre:string
    }
  }
  fecha_creacion: string;
  fecha_actualizacion: string;
  caracteristica: CaracteristicaResponseUpdateBackend;
}

export interface ProductoResponseTableBackend {
  id: number;
  stock: number;
  precio: number;
  tiempo_garantia: string;
  descripcion: string;
  modelo_id: number;
  media_puntaje: number;
  estado: string;
  modelo: {
    id: number;
    nombre: string;
  };
  fecha_creacion: string;
  fecha_actualizacion: string;
  caracteristica: {
    color:string
  };
}


export interface ProductoPaginado{
    items:ProductoResponseTableBackend[],
    meta:Meta
}