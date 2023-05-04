import { useEffect, useRef, useState } from "react";
import { Chart } from "chart.js/auto";
import { PRIMARY } from './../../../shared/styles/variables';
import { useAppSelector } from "../../../store/hooks";

const LineChart: React.FC<{ data: number[] }> = ({ data }) => {
  const {
    filterByDays,
    allOutlaysChart
  } = useAppSelector(state => state.statistics)

  const chartRef = useRef(null);
  const chart = useRef(null);

  const [labels, setLabels] = useState<string[]>([]);

  useEffect(() => {
    const labels: string[] = [];

    for (let i = 0; i < (parseInt(filterByDays)); i++) {
      labels.push(`${i + 1}д.`);
    }

    setLabels(labels)

    switch (filterByDays) {
      case "30":
        setPointHitRadiusValue(30)
        break;
      case "90":
        setPointHitRadiusValue(15)
        break;
      case "180":
        setPointHitRadiusValue(10)
        break;
      default:
        break;
    }
  }, [filterByDays]);

  const [pointHitRadiusValue, setPointHitRadiusValue] = useState<number>(1);

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
          data: data,
          fill: false,
          borderColor: PRIMARY,
          tension: 0.4,
          pointBackgroundColor: PRIMARY,
          pointBorderWidth: 4,
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
    <canvas style={{ zIndex: '-2' }} id="myLineChart" height="270px" ref={chartRef} />
  );
};

export default LineChart;
