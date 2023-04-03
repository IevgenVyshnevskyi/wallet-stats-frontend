import { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";
import { PRIMARY } from './../../../shared/styles/variables';

const LineChart: React.FC = () => {
  const chartRef = useRef(null);
  const chart = useRef(null);

  const labels: string[] = [];
  const chartData: number[] = [];

  for (let i = 1; i < 31; i++) {
    labels.push(`${i}д.`)
    chartData.push(Math.floor(Math.random() * 100000))
  }

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
          label: 'My First Dataset',
          data: chartData,
          fill: false,
          borderColor: PRIMARY,
          tension: 0.4,
          // pointBackgroundColor: "#ffffff11",
          pointBackgroundColor: PRIMARY,
          pointBorderWidth: 4,
          pointHitRadius: 30,
        }]
      },
      options: {
        plugins: {
          tooltip: {
            callbacks: {
              label: (context) => {
                const value = context.formattedValue;
                return `${value}$`;
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
      },
    });

    return () => {
      if (chart.current) {
        chart.current.destroy();
      }
    };
  }, []);

  return (
    <canvas id="myLineChart" height="270px" ref={chartRef} />
  );
};

export default LineChart;
