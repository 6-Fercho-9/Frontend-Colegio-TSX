//interface generica
export interface Paginado<T> {
  items: T[];
  meta: {
    current_page: number;
    total_pages: number;
    total_items: number;
    per_page: number;
  };
}
