import { ReactElement } from "react";

export interface DataSourceConfiguration<P> {
  type: string;
  properties: P;
}

export type RefreshFn = () => void;

/** Data-related properties */
export interface DataProperties<D> {
  refresh?: RefreshFn;
  loading: boolean;
  data?: D;
  customContent?: ReactElement;
  title?: string;
  emptyMessage?: ReactElement | string;
  errorMessage?: ReactElement | string;
}

/** The set of properties provided by a data source */
export interface DataSource<D> extends DataProperties<D> {
  // Override the DataProperties `refresh` to make it required
  refresh: RefreshFn;
}

export enum DataSourceType {
  Mock = "mock",
  Empty = "empty",
}
