import colorMap from "./colors.json";

/**
 * Returns an array of unique dates found in entries
 * @param entries
 */
export function getDates(entries) {
  if (!Array.isArray(entries)) {
    return false;
  }
  const dateStrings = entries.map(entry => {
    return entry && entry.date;
  });
  const setOfdates = [...new Set(dateStrings)];
  const dates = setOfdates.map(entry => {
    return new Date(entry);
  });

  return dates;
}

/**
 * labels: all of the dates
 * dataset: {
 *      label: chartName,
 *      data: [{place, date}]
 *  }
 */
export function getDatasets(entries) {
  if (!Array.isArray(entries)) {
    return;
  }
  const theseCharts = [new Map()];
  var latest = theseCharts[0];

  entries.forEach(entry => {
    if (entry === null) {
      // null means new song
    } else {
      if (latest.get(entry.chartName) === undefined) {
        latest.set(entry.chartName, []);
      }
      latest.get(entry.chartName).push({
        x: new Date(entry.date),
        y: entry.place
      });
    }
  });

  const datasets = [];
  theseCharts.forEach(chartMap => {
    chartMap.forEach((value, key) => {
      datasets.push({
        label: key,
        data: value,
        tension: 0.1
      });
    });
      datasets.push({ label: "break", data: "null" });
  });

  return datasets;
}

export function mapColors(datasets) {
  datasets &&
    datasets.forEach(function(dataset) {
      if (dataset) {
        dataset.backgroundColor = colorMap[dataset.label] || "black";
        dataset.borderColor = colorMap[dataset.label] || "black";
      }
    });
}
