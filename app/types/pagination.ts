export interface IPageInfo {
  total?: number;
  perPage?: number;
  currentPage: number;
  lastPage: number;
  hasNextPage?: boolean;
}

export interface IPaginatedResponse<T> {
  pageInfo: IPageInfo;
  data: T[];
}
