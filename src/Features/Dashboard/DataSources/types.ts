export enum DashboardDataSourceType {
  DashboardTimeSeriesWidget = "DashboardTimeSeriesWidget ",
  DashboardRadialBarWidget = "DashboardRadialBarWidget",
}

type RadialBarDataSourceProperties = {
  categoryLabels?: string[];
  minValue?: number;
  maxValue?: number;
  colorPalette?: string[];
};

export type RadialBarDataSource = {
  type: DashboardDataSourceType.DashboardRadialBarWidget;
  properties: RadialBarDataSourceProperties;
};
