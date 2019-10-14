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
  // This is not optimized on oh so many levels.
  // I think this is pretty easy to do in one pass
  // create a map with the chart name as the key
  // the value is the array of data
  if (!Array.isArray(entries)) {
    return;
  }
  const chartNames = entries.map(entry => {
    return entry.chartName;
  });

  const uniqueChartNames = [...new Set(chartNames)];
  // for each member of set, filter to get data

  const objectsFromName = uniqueChartNames.map(chartName => {
    const data = entries
      .filter(filterEntry => {
        return filterEntry.chartName === chartName;
      })
      .map(mapEntry => {
        return {
          x: new Date(mapEntry.date),
          y: mapEntry.place
        };
      });
    return {
      label: chartName,
      data
    };
  });

  return objectsFromName;
}
