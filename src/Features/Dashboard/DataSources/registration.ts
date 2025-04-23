import { DashboardDataSourceType } from "./types";
import { dataSourceRegistry } from "../../../DataSource/datasourceRegistry";
import { useTimeSeriesDataSource } from "./useTimeSeriesDataSource";
import { useRadialBarDataSource } from "./useRadialBarDataSource";

/**
 * This file takes care of the registration of widget data sources
 */

export function registerDashboardDataSources() {
  dataSourceRegistry.registerDataSource(
    DashboardDataSourceType.DashboardTimeSeriesWidget,
    useTimeSeriesDataSource,
  );

  dataSourceRegistry.registerDataSource(
    DashboardDataSourceType.DashboardRadialBarWidget,
    useRadialBarDataSource,
  );
}
