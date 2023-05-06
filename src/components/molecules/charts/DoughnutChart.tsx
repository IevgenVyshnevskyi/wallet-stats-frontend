import { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";
import { Box } from "../../atoms/box/Box.styled";
import { WHITE } from "../../../shared/styles/variables";
import { useAppSelector } from "../../../store/hooks";
import ChartDataLabels from 'chartjs-plugin-datalabels';

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
  const chartRef = useRef<any>(null);
  const chart = useRef<any>(null);

  const { incomesChart, expensesChart, allOutlaysChart, isLoading } = useAppSelector(state => state.statistics);

  useEffect(() => {
    const myDoughnutChartRef = chartRef.current.getContext('2d');

    if (chart.current) {
      chart.current.destroy(); // Destroy the previous chart instance
    }

    chart.current = new Chart(myDoughnutChartRef, {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [
          {
            data: data,
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
                size: 16,
              },
            },
          },
          datalabels: {
            formatter: (value, ctx) => {
              let sum = 0;
              let dataArr = ctx.chart.data.datasets[0].data;
              dataArr.map((data: any) => {
                if (typeof data === 'number') {
                  sum += data;
                }
              });
              let percentage: any = 0;
              if (typeof value === 'number') {
                percentage = ((value * 100) / sum).toFixed();
              }
              return percentage + '%';
            },
            backgroundColor: "rgba(85, 85, 85, 0.35)",
            borderRadius: 4,
            padding: 6,
            color: WHITE,
            font: {
              size: 13,
              family: "Inter",
              weight: "bold",
            },
          },
        },
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          duration: 1000,
        },
      },
      // Add the datalabels plugin
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
    <Box bgColor={WHITE} borderRadius="8px" p="5px 0">
      <Box width={isHomePage ? "100%" : "650px"} m="0 auto">
        <canvas id="myDoughnutChart" height={isHomePage && "325px"} ref={chartRef} />
      </Box>
    </Box>
  );
};

export default DoughnutChart;
