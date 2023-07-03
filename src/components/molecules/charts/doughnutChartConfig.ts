import { ChartData, ChartOptions } from "chart.js";

import COLORS from "../../../shared/styles/variables";

const calculatePercentage = (value: number, ctx: any): string => {
  let sum = 0;
  let dataArr = ctx.chart.data.datasets[0].data;
  let percentage: number = 0;

  dataArr.map((data: number) => {
    if (typeof data === 'number') {
      sum += data;
    }
  });

  if (typeof value === 'number') {
    percentage = parseInt(((value * 100) / sum).toFixed());
  }

  return percentage + '%';
}

export const getDoughnutChartConfig = (
  data: string[],
  labels: string[]
): { chartData: ChartData, chartOptions: ChartOptions } => {
  const chartData: ChartData = {
    labels: labels,
    datasets: [
      {
        data: data?.map(value => parseFloat(value)),
        backgroundColor: [
          '#7380F0',
          '#5DD9AD',
          '#E5FC6D',
          '#FAB471',
          '#D95DB2',
          '#6EE4E6',
          '#A3FC6D',
          '#F2CA68',
          '#F06C6F',
          '#926DFC',
        ],
        hoverBackgroundColor: [
          '#7380F0dd',
          '#5DD9ADdd',
          '#E5FC6Ddd',
          '#FAB471dd',
          '#D95DB2dd',
          '#6EE4E6dd',
          '#A3FC6Ddd',
          '#F2CA68dd',
          '#F06C6Fdd',
          '#926DFCdd',
        ],
        borderWidth: 0,
      },
    ],
  }

  const chartOptions: ChartOptions = {
    plugins: {
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const label = context?.dataset?.label || '';
            const value = context?.formattedValue;
            return `${label} ${value}₴`;
          },
        },
      },
      legend: {
        labels: {
          font: {
            size: 16,
          },
        },
      },
      datalabels: {
        formatter: calculatePercentage,
        backgroundColor: "rgba(85, 85, 85, 0.35)",
        borderRadius: 4,
        padding: 6,
        color: COLORS.WHITE,
        font: {
          size: 13,
          family: "Inter",
          weight: "bold" as const,
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 1000,
    },
  };

  return { chartData, chartOptions }
}