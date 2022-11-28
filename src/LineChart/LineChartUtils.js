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
 * @returns [{label: chart name, data: [{x: date, y: place}], tension: 0.1}]
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

  theseCharts.forEach((value, key) => {
    theseCharts.set(key, expandDateGaps(value))
  })


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

/**
 * Adds null between discontinuous dates. 
 * @param {[{x: Date, y: String}]} initialEntries 
 */
export function expandDateGaps(initialEntries) {
  const TEN_DAYS = 1000*60*60*24*10
  const entries = [...initialEntries]
  for (let i = 0; i < entries.length - 1; i++) {
    if (entries[i] != null && entries[i+1] != null) {
      const curEntry = entries[i]
      const nextEntry = entries[i + 1]
      const curDate = new Date(curEntry.x)
      const nextDate = new Date(nextEntry.x)
      if (nextDate.getTime() - curDate.getTime() > TEN_DAYS) {
        entries.splice(i+1, 0, null)
      }
    }
  }
  return entries;
}

export function mapColors(datasets) {
  datasets &&
    datasets.forEach(function (dataset) {
      dataset.backgroundColor = colorMap[dataset.label] || "black";
      dataset.borderColor = colorMap[dataset.label] || "black";
    });
}
