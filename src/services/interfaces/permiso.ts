import { Meta } from "./Bitacora";
import { Permiso } from "./usuarios";

export interface PermisoPaginado{
 items: Permiso[];
  meta: Meta;
}