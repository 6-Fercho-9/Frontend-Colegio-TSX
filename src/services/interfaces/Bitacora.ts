export interface Bitacora {
  id: number;
  username: string;
  ip: string;
  tipo_accion: string;
  fecha:string,
  hora:string
}

export interface Meta {
  total_items: number;
  total_pages: number;
  current_page: number;
  page_size: number;
}
export interface BitacoraPaginada {
  items: Bitacora[];
  meta: Meta;
}