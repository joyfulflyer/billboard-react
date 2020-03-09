import Chart from "chart.js";
import React, { useEffect } from "react";
import { getDates, getDatasets, mapColors } from "./LineChartUtils";
import styles from "./LineChart.module.scss";

export default function LineChart(props) {
  const chartRef = React.createRef();
  const { entries } = props;

  useEffect(() => {
    if (chartRef.current === undefined || chartRef.current === null) {
      return;
    }
    const ctx = chartRef.current.getContext("2d");

    /**
     * labels: all of the dates
     * dataset: {
     *      label: chartName,
     *      data: [{place, date}]
     *  }
     */
    const labels = getDates(entries);
    const datasets = getDatasets(entries);
    datasets &&
      datasets.forEach(dataset => {
        if (dataset && dataset.fill) {
          dataset.fill = false;
        }
      });
    mapColors(datasets);

    if (ctx) {
      new Chart(ctx, {
        type: "line",
        data: {
          labels,
          datasets
        },
        options: {
          scales: {
            yAxes: [
              {
                ticks: {
                  suggestedMax: 100,
                  suggestedMin: 1,
                  reverse: true
                }
              }
            ],
            xAxes: [
              {
                type: "time",
                unit: "week",
                distribution: "series",
                bounds: "data"
              }
            ]
          }
        }
      });
    }
  }, [entries, chartRef]);

  return (
    <div className={styles.lineChartContainer}>
      <canvas id="songChart" ref={chartRef} />
    </div>
  );
}
