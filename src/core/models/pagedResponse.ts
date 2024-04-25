export interface PagedResponse<T> {
  items: T[];
  pageSize: number;
  page: number;
  total: number;
  hasNext: boolean;
}
