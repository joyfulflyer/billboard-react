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
    return entry.date;
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
  const theseCharts = new Map();

  entries.forEach(entry => {
    if (theseCharts.get(entry.chartName) === undefined) {
      theseCharts.set(entry.chartName, []);
    }
    theseCharts.get(entry.chartName).push({
      x: new Date(entry.date),
      y: entry.place
    });
  });

  const datasets = [];
  theseCharts.forEach((value, key) => {
    datasets.push({
      label: key,
      data: value,
      tension: 0.1
    });
  });

  return datasets;
}

export function mapColors(datasets) {
  datasets &&
    datasets.forEach(function(dataset) {
      dataset.backgroundColor = colorMap[dataset.label] || "black";
      dataset.borderColor = colorMap[dataset.label] || "black";
    });
}
