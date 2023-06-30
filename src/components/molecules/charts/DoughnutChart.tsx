import { useEffect, useRef } from "react";

import { Chart } from "chart.js/auto";
import ChartDataLabels from 'chartjs-plugin-datalabels';

import { useAppSelector } from "../../../store/hooks";

import { getDoughnutChartConfig } from "./doughnutChartConfig";

import { Box } from "../../atoms/box/Box.styled";

import COLORS from "../../../shared/styles/variables";

type DoughnutChartProps = {
  data: string[];
  labels: string[];
  isHomePage?: boolean;
}

const DoughnutChart: React.FC<DoughnutChartProps> = ({
  data,
  labels,
  isHomePage
}) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chart = useRef<any>();

  const {
    incomesChart,
    expensesChart,
    allOutlaysChart
  } = useAppSelector(state => state.statistics);

  const { chartData, chartOptions } = getDoughnutChartConfig(data, labels)

  useEffect(() => {
    const myDoughnutChartRef = chartRef.current.getContext('2d');

    if (chart.current) {
      chart.current.destroy(); // Destroy the previous chart instance
    }

    chart.current = new Chart(myDoughnutChartRef, {
      type: 'doughnut',
      data: chartData,
      options: chartOptions,
      plugins: [ChartDataLabels],
    });

    return () => {
      if (chart.current) {
        chart.current.destroy();
      }
    };
  }, []);

  useEffect(() => {
    chart.current.data.labels = labels || [];
    chart.current.data.datasets[0].data = data || [];
    chart.current.update();
  }, [
    incomesChart.allTransactions,
    expensesChart.allTransactions,
    allOutlaysChart?.activeCategoryId,
    labels,
    data,
  ]);

  return (
    <Box bgColor={COLORS.WHITE} borderRadius="8px" p="5px 0">
      <Box width={isHomePage ? "100%" : "650px"} m="0 auto">
        <canvas id="myDoughnutChart" height={isHomePage && "325px"} ref={chartRef} />
      </Box>
    </Box>
  );
};

export default DoughnutChart;
