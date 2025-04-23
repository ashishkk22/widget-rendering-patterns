import React, { useEffect } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { dataSourceRegistry } from "../DataSource/datasourceRegistry";
import { DataProperties } from "../DataSource/types";
import { WidgetConfigProperties } from "./types";
import Loader from "../Components/Loader";

type SeriesInput = {
  key: string;
  color?: string;
  stackId?: string;
};

const DEFAULT_COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#8dd1e1"];

export type TimeSeriesWidgetData = {
  dataPoints: { [key: string]: any }[];
  xKey: string;
  yKeys: SeriesInput[];
};

type TimeSeriesWidgetProps = WidgetConfigProperties & {
  refreshHandle: number;
};

export function TimeSeriesWidget({
  dataSource,
  ...props
}: TimeSeriesWidgetProps): React.ReactElement {
  const DataSource = dataSourceRegistry.getDataSource<TimeSeriesWidgetData>(
    dataSource?.type,
  );

  return (
    <DataSource {...dataSource}>
      {(dataSourceOutput) => (
        <TimeSeriesWidgetComponent {...dataSourceOutput} {...props} />
      )}
    </DataSource>
  );
}

type TableWidgetComponentProps = Omit<TimeSeriesWidgetProps, "dataSource"> &
  DataProperties<TimeSeriesWidgetData>;

export default function TimeSeriesWidgetComponent({
  data,
  refreshHandle,
  refresh,
  loading,
}: TableWidgetComponentProps) {
  const { dataPoints, xKey, yKeys } = data ?? {};

  useEffect(() => {
    if (refreshHandle && refresh) {
      refresh();
    }
  }, [refreshHandle, refresh]);

  if (loading) {
    return <Loader />;
  }

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={dataPoints}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={xKey} />
        <YAxis />
        <Tooltip />
        <Legend />
        {yKeys?.map((s, i) => (
          <Bar
            key={s.key}
            dataKey={s.key}
            fill={s.color ?? DEFAULT_COLORS[i % DEFAULT_COLORS.length]}
            stackId={s.stackId}
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
}
