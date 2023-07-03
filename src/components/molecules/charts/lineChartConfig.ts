import { ChartData, ChartOptions } from "chart.js";

import COLORS from "../../../shared/styles/variables";

import { FilterByDaysOptions, Transactions } from "../../../store/types";

export const generateLabels = (
  categoryTransactions: Transactions,
  filterByDays: FilterByDaysOptions
) => {
  const labels: string[] = [];

  if (Object.keys(categoryTransactions)?.length > 0) {
    for (let i = 0; i < (parseInt(filterByDays)); i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);

      const label = date.toLocaleDateString("uk-UA", {
        month: "short",
        day: "numeric"
      });

      labels.push(label);
    }
  }

  return labels;
}

export const setPointValues = (
  filterByDays: FilterByDaysOptions,
  setPointHitRadiusValue: React.Dispatch<React.SetStateAction<number>>,
  setPointBorderWidthValue: React.Dispatch<React.SetStateAction<number>>,
) => {
  switch (filterByDays) {
    case "30":
      setPointHitRadiusValue(30)
      setPointBorderWidthValue(4)
      break;
    case "90":
      setPointHitRadiusValue(15)
      setPointBorderWidthValue(3)
      break;
    case "180":
      setPointHitRadiusValue(8)
      setPointBorderWidthValue(2)
      break;
    default:
      break;
  }
}

export const setLineChartConfig = (
  data: number[],
  labels: string[],
  pointBorderWidthValue: number,
  pointHitRadiusValue: number,
): { chartData: ChartData, chartOptions: ChartOptions } => {
  const chartData: ChartData = {
    labels: labels,
    datasets: [{
      label: 'Витрати або надходження за категорією',
      data,
      fill: false,
      borderColor: COLORS.PRIMARY,
      tension: 0.4,
      pointBackgroundColor: COLORS.PRIMARY,
      pointBorderWidth: pointBorderWidthValue,
      pointHitRadius: pointHitRadiusValue,
    }]
  }

  const chartOptions: ChartOptions = {
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => {
            const value = context.formattedValue;
            return `${value}₴`;
          },
        },
      },
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: "Період",
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: "Сума",
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    elements: {
      point: {
        hoverBorderWidth: 5,
      },
    },
    animation: {
      duration: 1000,
    },
  };

  return { chartData, chartOptions }
}