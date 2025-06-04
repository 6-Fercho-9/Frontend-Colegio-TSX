import { Meta } from "./Bitacora";
import { DatoGeneral } from "./usuarios";

export type Marca = DatoGeneral

export interface MarcaPaginado{
    items:Marca[],
    meta:Meta
}