import Chart from "chart.js";
import React, { Component } from "react";
import { getDates, getDatasets, mapColors } from "./LineChartUtils";
import styles from "./LineChart.module.scss";

export default class LineChart extends Component {
  constructor(props) {
    super(props);
    this.chartRef = React.createRef();
  }

  componentDidMount() {
    if (this.chartRef.current === undefined || this.chartRef.current === null) {
      return;
    }
    const ctx = this.chartRef.current.getContext("2d");
    const { entries } = this.props;

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
        dataset.fill = false;
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
  }

  render() {
    return (
      <div className={styles.lineChartContainer}>
        <canvas id="songChart" ref={this.chartRef} />
      </div>
    );
  }
}
