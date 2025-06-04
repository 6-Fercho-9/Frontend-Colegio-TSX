import { Meta } from "./Bitacora";
import { Rol } from "./usuarios";

export interface RolPaginado {
  items: Rol[];
  meta: Meta;
}

