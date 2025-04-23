import { useEffect } from "react";
import {
  RadialBarChart,
  RadialBar,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { WidgetConfigProperties } from "./types";
import { dataSourceRegistry } from "../DataSource/datasourceRegistry";
import { DataProperties } from "../DataSource/types";
import Loader from "../Components/Loader";

export type RadialBarWidgetDataPoint = {
  name: string;
  uv: number;
  pv: number;
  fill: string;
};

export type RadialBarWidgetData = {
  dataPoints: Array<RadialBarWidgetDataPoint>;
};

const style = {
  top: "50%",
  right: 0,
  transform: "translate(0, -50%)",
  lineHeight: "24px",
};

type RadialBarWidgetProps = WidgetConfigProperties & {
  refreshHandle: number;
};

export function RadialBarWidget({
  dataSource,
  ...props
}: RadialBarWidgetProps) {
  const DataSource = dataSourceRegistry.getDataSource<RadialBarWidgetData>(
    dataSource?.type,
  );

  return (
    <DataSource {...dataSource}>
      {(dataSourceOutput) => (
        <RadialBarWidgetComponent {...dataSourceOutput} {...props} />
      )}
    </DataSource>
  );
}

type RadialBarWidgetComponent = Omit<RadialBarWidgetProps, "dataSource"> &
  DataProperties<RadialBarWidgetData>;

const RadialBarWidgetComponent = ({
  data,
  refreshHandle,
  refresh,
  loading,
}: RadialBarWidgetComponent) => {
  const { dataPoints } = data ?? {};

  useEffect(() => {
    if (refreshHandle && refresh) {
      refresh();
    }
  }, [refreshHandle, refresh]);

  if (loading) {
    return <Loader />;
  }

  return (
    <ResponsiveContainer width={500} height={400}>
      <RadialBarChart
        cx="50%"
        cy="50%"
        innerRadius="10%"
        outerRadius="80%"
        barSize={10}
        data={dataPoints}
      >
        <RadialBar
          label={{ position: "insideStart", fill: "#fff" }}
          background
          dataKey="uv"
        />
        <Legend
          iconSize={10}
          layout="vertical"
          verticalAlign="middle"
          wrapperStyle={style}
        />
      </RadialBarChart>
    </ResponsiveContainer>
  );
};

export default RadialBarWidget;
