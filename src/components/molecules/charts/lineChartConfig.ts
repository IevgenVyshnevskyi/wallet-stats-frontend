import { ChartData, ChartOptions } from "chart.js";

import COLORS from "../../../shared/styles/variables";

import { Transactions } from "../../../../types/transactions";
import { FilterByDaysOptions } from "../../../../types/common";

export const generateLabels = (
  categoryTransactions: Transactions,
  filterByDays: FilterByDaysOptions
) => {
  const labels: string[] = [];

  if (Object.keys(categoryTransactions)?.length > 0) {
    const daysCount = parseInt(filterByDays);
    const daysArray = Array.from({ length: daysCount }).fill(null);

    daysArray.forEach((_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);

      const label = date.toLocaleDateString("uk-UA", {
        month: "short",
        day: "numeric",
      });

      labels.push(label);
    });
  }

  return labels;
};

export const setPointValues = (
  filterByDays: FilterByDaysOptions,
  setPointHitRadiusValue: React.Dispatch<React.SetStateAction<number>>,
  setPointBorderWidthValue: React.Dispatch<React.SetStateAction<number>>
) => {
  switch (filterByDays) {
    case "30":
      setPointHitRadiusValue(4);
      setPointBorderWidthValue(30);
      break;
    case "90":
      setPointHitRadiusValue(3);
      setPointBorderWidthValue(15);
      break;
    case "180":
      setPointHitRadiusValue(2);
      setPointBorderWidthValue(8);
      break;
    default:
      break;
  }
};

export const setLineChartConfig = (
  data: number[],
  labels: string[],
  pointBorderWidthValue: number,
  pointHitRadiusValue: number
): { chartData: ChartData; chartOptions: ChartOptions } => {
  const chartData: ChartData = {
    labels,
    datasets: [
      {
        label: "Витрати або надходження за категорією",
        data,
        fill: false,
        borderColor: COLORS.PRIMARY,
        tension: 0.4,
        pointBackgroundColor: COLORS.PRIMARY,
        pointBorderWidth: pointBorderWidthValue,
        pointHitRadius: pointHitRadiusValue,
      },
    ],
  };

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

  return { chartData, chartOptions };
};
