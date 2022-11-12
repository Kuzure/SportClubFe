export interface Pageable<T> {
  result: Array<T>;
  code: number;
  message: string;
  isError: boolean;
  currentPage: number;
  totalCount: number;
  totalPages: number;
}
