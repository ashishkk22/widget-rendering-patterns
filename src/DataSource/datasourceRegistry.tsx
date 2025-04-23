import { FC, type JSX } from "react";

import { DataSource, DataSourceConfiguration, DataSourceType } from "./types";
import { useEmptyDataSource } from "./useEmptyDataSource";

export type DataSourceHook<D, P> = (
  configuration: DataSourceConfiguration<P>,
) => DataSource<D>;

export type DataSourceComponent<D = unknown, P = any> = FC<
  DataSourceConfiguration<P> & {
    children: (dataSource: DataSource<D>) => JSX.Element;
  }
>;

/**
 * Registry that converts string-based data source types into data-providing components.
 */
export class DataSourceRegistry {
  private dataSources: Record<string, DataSourceComponent> = {};

  public registerDataSource<D, P>(
    type: string,
    useDataSource: DataSourceHook<D, P>,
  ): void {
    const dataSource = this.createDataSourceComponent(useDataSource);

    this.dataSources[type] = dataSource as DataSourceComponent;
  }

  public getDataSource<D>(type: string | undefined): DataSourceComponent<D> {
    const dataSource = type && this.dataSources[type];

    if (!dataSource) {
      return this.dataSources[DataSourceType.Empty] as DataSourceComponent<D>;
    }

    return dataSource as DataSourceComponent<D>;
  }

  /**
   * Creates data source component using the data source hook.
   * @param useDataSource - A data source hook.
   * @returns A component with a data source configuration props
   * and a render prop which returns data source.
   */
  private createDataSourceComponent<D, P>(
    useDataSource: DataSourceHook<D, P>,
  ): DataSourceComponent<D, P> {
    const DataSourceComponent: DataSourceComponent<D, P> = ({
      children,
      ...configuration
    }) => {
      const dataSource = useDataSource({
        type: configuration.type,
        properties: configuration.properties,
      });

      return children(dataSource);
    };

    return DataSourceComponent;
  }
}

export const dataSourceRegistry = new DataSourceRegistry();

dataSourceRegistry.registerDataSource<unknown, unknown>(
  DataSourceType.Empty,
  useEmptyDataSource,
);
