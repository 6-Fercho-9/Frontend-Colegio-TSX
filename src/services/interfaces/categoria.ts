import { Meta } from "./Bitacora";
import { DatoGeneral } from "./usuarios";

export type Categoria = DatoGeneral

export interface CategoriaPaginado{
    items:Categoria[],
    meta:Meta
}