import { getDates, getDatasets, mapColors, expandDateGaps } from "./LineChartUtils";

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

const discontinuousEntries = [
  { y: 96, x: "1958-08-18" },
  { y: 22, x: "1958-09-01" },
  { y: 11, x: "1958-09-08" },
]

const yearJumpingEntries = [
  {
      x: "1994-12-31T00:00:00.000Z",
      y: 8
  },
  {
      x: "1995-01-07T00:00:00.000Z",
      y: 28
  },
  {
      x: "1995-01-14T00:00:00.000Z",
      y: 50
  },
  {
      x: "1995-02-04T00:00:00.000Z",
      y: 87
  },
  {
      x: "1995-02-11T00:00:00.000Z",
      y: 83
  },
  {
      x: "1995-02-18T00:00:00.000Z",
      y: 93
  },
  {
      x: "1995-02-25T00:00:00.000Z",
      y: 100
  },
  {
      x: "1995-03-04T00:00:00.000Z",
      y: 59
  },
  {
      x: "1995-03-11T00:00:00.000Z",
      y: 79
  },
  {
      x: "1995-03-18T00:00:00.000Z",
      y: 76
  },
  {
      x: "2007-11-17T00:00:00.000Z",
      y: 78
  },
  {
      x: "2007-11-24T00:00:00.000Z",
      y: 46
  },
  {
      x: "2007-12-01T00:00:00.000Z",
      y: 23
  },
  {
      x: "2007-12-08T00:00:00.000Z",
      y: 8
  },
  {
      x: "2007-12-15T00:00:00.000Z",
      y: 4
  },
  {
      x: "2007-12-22T00:00:00.000Z",
      y: 6
  },
  {
      x: "2007-12-29T00:00:00.000Z",
      y: 20
  },
  {
      x: "2008-11-15T00:00:00.000Z",
      y: 59
  },
  {
      x: "2008-11-22T00:00:00.000Z",
      y: 45
  },
  {
      x: "2008-11-29T00:00:00.000Z",
      y: 37
  },
  {
      x: "2008-12-06T00:00:00.000Z",
      y: 17
  },
  {
      x: "2008-12-13T00:00:00.000Z",
      y: 12
  },
  {
      x: "2008-12-20T00:00:00.000Z",
      y: 17
  },
  {
      x: "2008-12-27T00:00:00.000Z",
      y: 25
  },
  {
      x: "2009-11-21T00:00:00.000Z",
      y: 77
  },
  {
      x: "2009-11-28T00:00:00.000Z",
      y: 51
  },
  {
      x: "2009-12-05T00:00:00.000Z",
      y: 29
  },
  {
      x: "2009-12-12T00:00:00.000Z",
      y: 19
  },
  {
      x: "2009-12-19T00:00:00.000Z",
      y: 21
  }
]

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

    it("Should remove duplicate dates", () => {
      const dates = getDates(mixedEntries);
      const compDate = new Date("1958-11-17");
      const filtered = dates.filter(date => {
        return date.getTime() == compDate.getTime();
      });
      expect(filtered).toHaveLength(1);
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

  describe("Map Colors", () => {
    const data = [
      {
        label: "hot-100"
      },
      {
        label: "cow"
      }
    ];

    it("Should add backgroundcolor and bordercolor to the datasets", () => {
      mapColors(data);
      expect(data[0]).toHaveProperty("backgroundColor");
      expect(data[0]).toHaveProperty("borderColor");
    });

    it("Should set the color from the color map", () => {
      mapColors(data);
      expect(data[0]).toHaveProperty("backgroundColor", "blue");
      expect(data[0]).toHaveProperty("borderColor", "blue");
    });

    it("Should unknown labels to black", () => {
      mapColors(data);
      expect(data[1]).toHaveProperty("backgroundColor", "black");
      expect(data[1]).toHaveProperty("borderColor", "black");
    });
  });

  describe("Discontinuous dates", () => {
    it ("Should not modify the original array", () => {
      const initialCopy = [...discontinuousEntries]
      expandDateGaps(discontinuousEntries)
      expect(discontinuousEntries).toBeDefined()
      expect(discontinuousEntries).toHaveLength(initialCopy.length)
    })

    it("Should add null when dates are more than 10 days away from each other", () => {
      const expanded = expandDateGaps(discontinuousEntries)
      expect(expanded).toHaveLength(discontinuousEntries.length+1)
      expect(expanded[0]).toHaveProperty("x", "1958-08-18")
      expect(expanded[1]).toBe(null)
      expect(expanded[2]).toHaveProperty("x", "1958-09-01")
      expect(expanded[3]).toHaveProperty("x", "1958-09-08")
    })

    it("Should handle dates more than a year apart", () => {
      debugger
      const expanded = expandDateGaps(yearJumpingEntries)
      expect(expanded[0]).toHaveProperty("x", "1994-12-31T00:00:00.000Z")
      expect(expanded[1]).toHaveProperty("x", "1995-01-07T00:00:00.000Z")
      expect(expanded[3]).toBe(null)
      expect(expanded[11]).toBe(null)
    })
  })
});
