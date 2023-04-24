import { useEffect, useRef, useState } from "react";
import { Chart } from "chart.js/auto";
import { PRIMARY } from './../../../shared/styles/variables';
import { useAppSelector } from "../../../store/hooks";
import { isDev } from "../../../consts/consts";
import { mockData } from "../../../../mock-data/doughnutCharts";

const LineChart: React.FC = () => {
  const {
    filterByDays,
    allOutlaysChart
  } = useAppSelector(state => state.statistics)

  const chartRef = useRef(null);
  const chart = useRef(null);

  const [labels, setLabels] = useState<string[]>([]);
  const [mockArr, setMockArr] = useState<number[]>([]);

  const chartData: number[] = Object.values(
    allOutlaysChart.categoryTransactions
  )
    ?.flatMap(transactionsArr => transactionsArr.map(transaction => (
      parseInt(transaction.amount_of_funds)
    )));

  useEffect(() => {
    const newLabels: string[] = [];
    const newMockArr: number[] = [];

    for (let i = 0; i < (parseInt(filterByDays)); i++) {
      newLabels.push(`${i + 1}д.`);
      isDev ? newMockArr.push(Math.floor(Math.random() * 10000)) : undefined;
    }

    setLabels(newLabels)
    setMockArr(newMockArr)

    switch (filterByDays) {
      case "30":
        setPointHitRadiusValue(30)
        setPointBorderWidth(4);
        setHoverBorderWidth(5);
        break;
      case "90":
        setPointHitRadiusValue(15)
        setPointBorderWidth(3);
        setHoverBorderWidth(4);
        break;
      case "180":
        setPointHitRadiusValue(10)
        setPointBorderWidth(2);
        setHoverBorderWidth(3);
        break;
      default:
        break;
    }
  }, [filterByDays]);

  const [pointHitRadiusValue, setPointHitRadiusValue] = useState<number>(30);
  const [pointBorderWidth, setPointBorderWidth] = useState<number>(4);
  const [hoverBorderWidth, setHoverBorderWidth] = useState<number>(5);

  useEffect(() => {
    const myLineChartRef = chartRef.current.getContext("2d");

    if (chart.current) {
      chart.current.destroy(); // Destroy the previous chart instance
    }

    chart.current = new Chart(myLineChartRef, {
      type: "line",
      data: {
        labels: labels,
        datasets: [{
          label: 'Витрати або надходження за категорією',
          data: isDev ? mockArr : chartData,
          fill: false,
          borderColor: PRIMARY,
          tension: 0.4,
          pointBackgroundColor: PRIMARY,
          pointBorderWidth: pointBorderWidth,
          pointHitRadius: pointHitRadiusValue,
        }]
      },
      options: {
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
            hoverBorderWidth: hoverBorderWidth,
          },
        },
      },
    });

    return () => {
      if (chart.current) {
        chart.current.destroy();
      }
    };
  }, [labels]);

  return (
    <canvas id="myLineChart" height="270px" ref={chartRef} />
  );
};

export default LineChart;
