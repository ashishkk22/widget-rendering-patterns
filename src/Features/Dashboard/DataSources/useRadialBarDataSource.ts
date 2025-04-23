import { useState, useCallback } from "react";
import { DataSource, DataSourceConfiguration } from "../../../DataSource/types";
import {
  RadialBarWidgetData,
  RadialBarWidgetDataPoint,
} from "../../../Widgets/RadialBarWidget";
import { RadialBarDataSource } from "./types";

function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function useRadialBarDataSource(
  configuration: DataSourceConfiguration<RadialBarDataSource["properties"]>,
): DataSource<RadialBarWidgetData> {
  const {
    categoryLabels = [
      "18-24",
      "25-29",
      "30-34",
      "35-39",
      "40-49",
      "50+",
      "Unknown",
    ],
    minValue = 2,
    maxValue = 35,
    colorPalette = [
      "#8884d8",
      "#83a6ed",
      "#8dd1e1",
      "#82ca9d",
      "#a4de6c",
      "#d0ed57",
      "#ffc658",
    ],
  } = configuration.properties ?? {};

  const generateData = (): RadialBarWidgetDataPoint[] => {
    return categoryLabels.map((label, index) => ({
      name: label,
      uv: getRandomInt(minValue, maxValue),
      pv: getRandomInt(1000, 10000),
      fill: colorPalette[index % colorPalette.length],
    }));
  };

  const [dataPoints, setDataPoints] =
    useState<RadialBarWidgetDataPoint[]>(generateData());
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      const data = generateData();
      setDataPoints(data);
      setLoading(false);
    }, 500);
  }, []);

  return {
    data: {
      dataPoints,
    },
    loading,
    refresh: fetchData,
  };
}
