import { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";
import { Box } from "../../atoms/box/Box.styled";
import { WHITE } from "../../../shared/styles/variables";
import { useAppSelector } from "../../../store/hooks";

type DoughnutChartProps = {
  data: string[];
  labels: string[];
  handleUpdate?: () => void;
  chartType: "income" | "expense";
}

const DoughnutChart: React.FC<DoughnutChartProps> = ({
  data,
  labels,
  handleUpdate,
  chartType
}) => {
  const chartRef = useRef(null);
  const chart = useRef(null);

  const { categories } = useAppSelector(state => state.category);
  const { transactions } = useAppSelector(state => state.transaction);

  useEffect(() => {
    const myDoughnutChartRef = chartRef.current.getContext("2d");

    if (chart.current) {
      chart.current.destroy(); // Destroy the previous chart instance
    }

    chart.current = new Chart(myDoughnutChartRef, {
      type: "doughnut",
      data: {
        labels: labels,
        datasets: [
          {
            data: data,
            backgroundColor: [
              "#7380F0",
              "#5DD9AD",
              "#E5FC6D",
              "#FAB471",
              "#D95DB2"
            ],
            hoverBackgroundColor: [
              "#7380F0dd",
              "#5DD9ADdd",
              "#E5FC6Ddd",
              "#FAB471dd",
              "#D95DB2dd"
            ],
            borderWidth: 0
          }
        ]
      },
      options: {
        plugins: {
          tooltip: {
            callbacks: {
              label: (context) => {
                const label = context?.dataset?.label || '';
                const value = context?.formattedValue;
                return `${label} ${value}₴`;
              },
            },
          },
          legend: {
            labels: {
              font: {
                size: 16
              },
            },
          },
        },
        responsive: true,
        maintainAspectRatio: false
      },
    });

    return () => {
      if (chart.current) {
        chart.current.destroy();
      }
    };

  }, []);

  // if (chartType === "income") {
  useEffect(() => {
    if (categories[chartType]?.length > 0 || Object.keys(transactions[chartType])?.length > 0) {
      chart.current.data.labels = labels || [];
      chart.current.data.datasets.data = data || [];
      chart.current.update();
    }

  }, [categories[chartType], transactions[chartType]]);
  // } else {

  // }

  return (
    <Box bgColor={WHITE} borderRadius="8px" p="5px 0">
      <Box width="315px" m="0 auto">
        <canvas id="myDoughnutChart" ref={chartRef} />
      </Box>
    </Box>
  );
};

export default DoughnutChart;
