import { getDates, getDatasets } from "./LineChartUtils";

const entries = [
  { place: 92, chartId: 5, chartName: "hot-100", date: "1958-08-11" },
  { place: 47, chartId: 6, chartName: "hot-100", date: "1958-08-18" },
  { place: 39, chartId: 7, chartName: "hot-100", date: "1958-08-25" },
  { place: 31, chartId: 8, chartName: "hot-100", date: "1958-09-01" },
  { place: 26, chartId: 9, chartName: "hot-100", date: "1958-09-08" },
  { place: 42, chartId: 10, chartName: "hot-100", date: "1958-09-15" },
  { place: 61, chartId: 11, chartName: "hot-100", date: "1958-09-22" },
  { place: 44, chartId: 12, chartName: "hot-100", date: "1958-09-29" },
  { place: 53, chartId: 13, chartName: "hot-100", date: "1958-10-06" },
  { place: 98, chartId: 14, chartName: "hot-100", date: "1958-10-13" }
];

describe("Line chart utils", () => {
  describe("getDates", () => {
    it("Returns a value", () => {
      const dates = getDates(entries);
      expect(dates).toBeDefined();
    });

    it("Returns the correct number of objects", () => {
      const dates = getDates(entries);
      expect(dates).toHaveLength(10);
    });

    it("Returns only date objects", () => {
      const dates = getDates(entries);
      dates.forEach(element => {
        expect(element).toBeInstanceOf(Date);
      });
    });

    it("Handles undefined entries", () => {
      getDates();
    });

    it("Does not crash when passed an object", () => {
      getDates({});
    });
  });

  /**
   * labels: all of the dates
   * dataset: {
   *      label: chartName,
   *      data: [{place, date}]
   *  }
   */
  describe("getDatasets", () => {
    const mixedEntries = [
      { place: 96, chartId: 6, chartName: "hot-100", date: "1958-08-18" },
      { place: 40, chartId: 7, chartName: "hot-100", date: "1958-08-25" },
      { place: 22, chartId: 8, chartName: "hot-100", date: "1958-09-01" },
      { place: 11, chartId: 9, chartName: "hot-100", date: "1958-09-08" },
      { place: 4, chartId: 10, chartName: "hot-100", date: "1958-09-15" },
      { place: 3, chartId: 11, chartName: "hot-100", date: "1958-09-22" },
      { place: 1, chartId: 12, chartName: "hot-100", date: "1958-09-29" },
      { place: 1, chartId: 13, chartName: "hot-100", date: "1958-10-06" },
      { place: 1, chartId: 14, chartName: "hot-100", date: "1958-10-13" },
      { place: 1, chartId: 15, chartName: "hot-100", date: "1958-10-20" },
      { place: 1, chartId: 16, chartName: "hot-100", date: "1958-10-27" },
      { place: 1, chartId: 17, chartName: "hot-100", date: "1958-11-03" },
      { place: 3, chartId: 18, chartName: "hot-100", date: "1958-11-10" },
      { place: 4, chartId: 19, chartName: "hot-100", date: "1958-11-17" },
      { place: 5, chartId: 20, chartName: "hot-100", date: "1958-11-24" },
      { place: 10, chartId: 21, chartName: "hot-100", date: "1958-12-01" },
      { place: 12, chartId: 22, chartName: "hot-100", date: "1958-12-08" },
      { place: 25, chartId: 23, chartName: "hot-100", date: "1958-12-15" },
      { place: 29, chartId: 24, chartName: "hot-100", date: "1958-12-22" },
      { place: 38, chartId: 25, chartName: "hot-100", date: "1958-12-29" },
      { place: 43, chartId: 26, chartName: "hot-100", date: "1959-01-05" },
      { place: 58, chartId: 27, chartName: "hot-100", date: "1959-01-12" },
      {
        place: 3,
        chartId: 3206,
        chartName: "r-b-hip-hop-songs",
        date: "1958-10-20"
      },
      {
        place: 2,
        chartId: 3207,
        chartName: "r-b-hip-hop-songs",
        date: "1958-10-27"
      },
      {
        place: 2,
        chartId: 3209,
        chartName: "r-b-hip-hop-songs",
        date: "1958-11-03"
      },
      {
        place: 2,
        chartId: 3210,
        chartName: "r-b-hip-hop-songs",
        date: "1958-11-10"
      },
      {
        place: 2,
        chartId: 3211,
        chartName: "r-b-hip-hop-songs",
        date: "1958-11-17"
      },
      {
        place: 3,
        chartId: 3212,
        chartName: "r-b-hip-hop-songs",
        date: "1958-11-24"
      },
      {
        place: 4,
        chartId: 3213,
        chartName: "r-b-hip-hop-songs",
        date: "1958-12-01"
      },
      {
        place: 7,
        chartId: 3214,
        chartName: "r-b-hip-hop-songs",
        date: "1958-12-08"
      },
      {
        place: 7,
        chartId: 3215,
        chartName: "r-b-hip-hop-songs",
        date: "1958-12-15"
      }
    ];

    it("Should return a value", () => {
      const datasets = getDatasets(entries);
      expect(datasets).toBeDefined();
    });

    it("Should return a dataset per chart type", () => {
      const datasets = getDatasets(mixedEntries);
      expect(datasets).toHaveLength(2);
    });

    it("Should return a dataset with an object containing a chart name", () => {
      const datasets = getDatasets(mixedEntries);
      expect(datasets[0]).toHaveProperty("label", "hot-100");
      expect(datasets[1]).toHaveProperty("label", "r-b-hip-hop-songs");
    });

    it("Should have a data array for each dataset", () => {
      const datasets = getDatasets(mixedEntries);
      expect(datasets[0].data).toHaveLength(22);
      expect(datasets[1].data).toHaveLength(9);
    });

    it("Should have the date as the x value for each data in the dataset", () => {
      const datasets = getDatasets(mixedEntries);
      const firstDataInFirstDataset = datasets[0].data[0];
      expect(firstDataInFirstDataset).toHaveProperty("x");
      expect(firstDataInFirstDataset.x).toBeInstanceOf(Date);
      expect(firstDataInFirstDataset.x.getTime()).toBe(
        new Date(mixedEntries[0].date).getTime()
      );
    });

    it("Should have the place as the y value", () => {
      const datasets = getDatasets(mixedEntries);
      const firstDataInFirstDataset = datasets[0].data[0];
      expect(firstDataInFirstDataset.y).toBe(mixedEntries[0].place);
    });
  });
});
