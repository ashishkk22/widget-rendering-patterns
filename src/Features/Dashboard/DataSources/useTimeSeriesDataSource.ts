import { useState, useCallback } from "react";
import { DataSource } from "../../../DataSource/types";
import { TimeSeriesWidgetData } from "../../../Widgets/TimeSeriesWidget";

function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateRandomData(): TimeSeriesWidgetData {
  const baseDate = new Date("2025-04-01");
  const days = 7;

  const dataPoints = Array.from({ length: days }, (_, i) => {
    const date = new Date(baseDate);
    date.setDate(date.getDate() + i);
    return {
      date: date.toISOString().slice(0, 10),
      uniqueVisitors: getRandomInt(1000, 5000),
      pageView: getRandomInt(1000, 10000),
      amountSpent: getRandomInt(1000, 3000),
    };
  });

  const yKeys = [
    { key: "pageView", color: "#8884d8", stackId: "a" },
    { key: "amountSpent", color: "#82ca9d", stackId: "a" },
    { key: "uniqueVisitors", color: "#ffc658" },
  ];

  return {
    dataPoints,
    xKey: "date",
    yKeys,
  };
}

export function useTimeSeriesDataSource(): DataSource<TimeSeriesWidgetData> {
  const [result, setResult] =
    useState<TimeSeriesWidgetData>(generateRandomData());

  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      const data = generateRandomData();
      setResult(data);
      setLoading(false);
    }, 500);
  }, []);

  return {
    data: result,
    refresh: fetchData,
    loading,
  };
}
