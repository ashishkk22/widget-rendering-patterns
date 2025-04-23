import { DataSource } from "./types";

export function useEmptyDataSource<D>(): DataSource<D> {
  return {
    refresh: (): void => { },
    data: undefined,
    loading: false
  };
}
