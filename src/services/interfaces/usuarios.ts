import { Meta } from "./Bitacora";
import { Categoria } from "./categoria";
import { Marca } from "./marca";
import { Modelo } from "./modelo";
import {  ProductoResponseUpdateBackend } from "./producto";

export interface DatoGeneral{
    id: number,
    nombre: string,
    fecha_creacion?: string,
    fecha_actualizacion?: string
}

export type Permiso = DatoGeneral;

export interface Rol extends DatoGeneral{
    permisos ?: Permiso[];
 }

export interface Usuario extends DatoGeneral {
  email: string;
  rol_id: number;
  username?: string;
  url_profile: string;
  rol?: Rol;
  ci: string;
  estado:string;
}


export interface Error {
  message: string;
  error: number;
  fecha: string;
}

// Tipo para el retorno de los servicios de login y signup
export interface AuthResponse {
  user: Usuario; // Puedes especificar un tipo más detallado según la respuesta
  message?: string;
  token?: string;
}

export interface ResponseDefault{
  message?: string,
  rol?: Rol
  permiso?: Permiso,
  marca?:Marca,
  categoria?:Categoria,
  marcas?:Marca[],
  categorias?:Categoria[],
  modelo?:Modelo,
  usuario?:Usuario,
  producto?:ProductoResponseUpdateBackend
  
}

export interface UsuarioPaginado{
  items:Usuario[],
  meta:Meta
}





// para la creacion de ususarios
export interface UsuarioCreateRequest {
  id?: number,
  email: string;
  rol_id: number;
  nombre: string;
  password: string;
}

export interface UsuarioUpdateRequest extends UsuarioCreateRequest {
  nombre: string;
}


