import { Meta } from "./Bitacora";
import { Categoria } from "./categoria";
import { Marca } from "./marca";
import { DatoGeneral } from "./usuarios";

export interface Modelo extends DatoGeneral {
  stock_total:number,
  marca:Marca
  categoria:Categoria
}

export interface ModeloPaginado{
    items:Modelo[],
    meta:Meta
}



export interface ModeloRequest {
  nombre?: string;
  marca_id: number;
  categoria_id: number;
  stock_total?: number;
  id?:number//referencia al id del Modelo
}

export interface ModeloProducto {
  id: number;
  nombre: string;
  descripcion:string;
  marca: { nombre: string };
  categoria: { nombre: string };
}