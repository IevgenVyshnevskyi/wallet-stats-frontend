import { useState, useEffect, useRef } from "react";

import { Chart } from "chart.js/auto";

import { useAppSelector } from "../../../store/hooks";

import {
  generateLabels,
  setLineChartConfig,
  setPointValues,
} from "./lineChartConfig";

const LineChart: React.FC<{ data: number[] }> = ({ data }) => {
  const { filterByDays, allOutlaysChart } = useAppSelector(
    (state) => state.statistics
  );

  const chartRef = useRef(null);
  const chart = useRef(null);

  const [labels, setLabels] = useState<string[]>([]);

  const [pointHitRadiusValue, setPointHitRadiusValue] = useState<number>(1);
  const [pointBorderWidthValue, setPointBorderWidthValue] = useState<number>(1);

  const { chartData, chartOptions } = setLineChartConfig(
    data,
    labels,
    pointHitRadiusValue,
    pointBorderWidthValue
  );

  useEffect(() => {
    const labels = generateLabels(
      allOutlaysChart.categoryTransactions,
      filterByDays
    );

    setLabels(labels);

    setPointValues(
      filterByDays,
      setPointHitRadiusValue,
      setPointBorderWidthValue
    );
  }, [allOutlaysChart.categoryTransactions]);

  useEffect(() => {
    const myLineChartRef = chartRef.current.getContext("2d");

    if (chart.current) {
      chart.current.destroy(); // Destroy the previous chart instance
    }

    chart.current = new Chart(myLineChartRef, {
      type: "line",
      data: chartData,
      options: chartOptions,
    });

    return () => {
      if (chart.current) {
        chart.current.destroy();
      }
    };
  }, [labels]);

  useEffect(() => {
    chart.current.labels = labels;
    chart.current.data.datasets[0].data = data;
    chart.current.update();
  }, [
    allOutlaysChart.categoryTransactions,
    allOutlaysChart.activeCategoryId,
    allOutlaysChart.allTransactions,
    labels,
    data,
  ]);

  return (
    <canvas
      style={{ zIndex: "-2" }}
      id="myLineChart"
      height="280px"
      ref={chartRef}
    />
  );
};

export default LineChart;
