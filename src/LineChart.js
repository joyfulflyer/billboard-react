import Chart from "chart.js";
import React, { Component } from "react";
import { getDates } from "./LineChartUtils";

export default class LineChart extends Component {
  constructor(props) {
    super(props);
    this.chartRef = React.createRef();
  }

  componentDidMount() {
    const ctx = this.chartRef.current.getContext("2d");

    /**
     * labels: all of the dates
     * dataset: {
     *      label: chartName,
     *      data: [{place, date}]
     *  }
     */
    console.log("line chart entries", this.props.entries);

    //   const labels = getDates(this.props);

    new Chart(ctx, {
      type: "line",
      data: {
        labels: [],
        datasets: [
          {
            label: "hot-100",
            data: [1, 2]
          }
        ]
      }
    });
  }

  render() {
    console.log("line render");
    return (
      <div>
        <canvas id="songChart" ref={this.chartRef} />
      </div>
    );
  }
}
