import { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";
import { Box } from "../../atoms/box/Box.styled";
import { WHITE } from "../../../shared/styles/variables";

const DoughnutChart: React.FC = () => {
  const chartRef = useRef(null);
  const chart = useRef(null);

  useEffect(() => {
    const myDoughnutChartRef = chartRef.current.getContext("2d");

    if (chart.current) {
      chart.current.destroy(); // Destroy the previous chart instance
    }

    chart.current = new Chart(myDoughnutChartRef, {
      type: "doughnut",
      data: {
        labels: [
          "Подарунки та благодійність",
          "Охорона здоров'я та краса",
          "Їжа та напої",
          "Електроніка та техніка",
          "Комунальні послуги"
        ],
        datasets: [
          {
            // data: [12314, 5125, 2150, 335, 51255],
            data: [30, 25, 20, 15, 10],
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
                const label = context.dataset.label || '';
                const value = context.formattedValue;
                return `${label} ${value}$`;
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

  return (
    <Box bgColor={WHITE} borderRadius="8px" p="5px 0">
      <Box width="315px" m="0 auto">
        <canvas id="myDoughnutChart" ref={chartRef} />
      </Box>
    </Box>
  );
};

export default DoughnutChart;