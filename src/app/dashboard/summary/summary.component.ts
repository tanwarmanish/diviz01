import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css'],
})
export class SummaryComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  Math = Math;
  styleStr = 'width: 100%; height: 60px; display: block; pointer-events: none';

  dataList = [
    {
      title: 'Revenue',
      total: 0,
      changePercent: 0,
      chartOptions: this.initChartOptions(0),
    },
    {
      title: 'Profits',
      total: 0,
      changePercent: 0,
      chartOptions: this.initChartOptions(1),
    },
    {
      title: 'Gross Margin',
      total: 0,
      changePercent: 0,
      chartOptions: this.initChartOptions(2),
    },
    {
      title: 'Shipment Count',
      total: 0,
      changePercent: 0,
      chartOptions: this.initChartOptions(3),
    },
  ];
  parentThis = this;
  constructor() {}

  ngOnInit(): void {}

  initChartOptions(index: number): any {
    return {
      chart: {
        type: 'areaspline',
        events: {
          load: function () {
            let self: any = this;
            let pThis = self.userOptions.parentThis;
            let cIndex = self.userOptions.chartIndex;
            let series = self.series[0];
            setInterval(() => {
              let y = 10 * Math.random();
              series.addPoint([y], true, true);
              pThis.calculateStats(cIndex, series);
            }, 3000);
          },
        },
      },
      parentThis: this,
      chartIndex: index,
      title: { text: '' },
      exporting: { enabled: false },

      legend: { enabled: false },
      yAxis: [{ visible: false }],
      xAxis: [{ visible: false }],
      plotOptions: {
        areaspline: {
          marker: {
            enabled: false,
          },
        },
      },
      series: [
        {
          name: 'Installation',
          data: [...new Array(5)].map((i) => 1),
        },
      ],
    };
  }

  calculateStats(index: number, series: any) {
    let length = series.yData.length;
    let data = series.yData;
    let current = data[length - 1] || 0;
    let previous = data[length - 2] || 0;
    let change = ((current - previous) / previous) * 100;
    let total = data.reduce((s: number, i: number) => s + i, 0);
    this.dataList[index].total = +total.toFixed(2);
    this.dataList[index].changePercent = +change.toFixed(2);
  }
}
