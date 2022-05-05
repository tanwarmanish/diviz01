import { Component, Input, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
@Component({
  selector: 'chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
})
export class ChartComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  @Input() chartOptions: Highcharts.Options = {};
  @Input() dataList: any[] = [];
  @Input() options: any = {
    series: [],
    labels: {},
    xAxis: null,
    yAxis: null,
    type: 'column',
    title: {},
  };

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: any): void {
    if (changes && (changes.dataList || changes.options)) {
      this.initChart();
    }
  }

  initChart() {
    let dataObj = this.extractColumns(this.dataList);
    let series = this.options.series.map((key: string) => {
      let obj = {
        data: dataObj[key],
        type: this.options.type,
        name: this.options.labels[key],
      };
      return obj;
    });

    // init chart
    this.chartOptions = {
      ...this.chartOptions,
      title: { text: '', ...this.options.title },
      series,
    };
  }

  // extract out all the arrays out of main array
  extractColumns(dataList: any[]) {
    if (this.dataList.length == 0) return;
    let dataObj: any = {};
    for (let key in dataList[0]) dataObj[key] = [];

    dataList.forEach((curr: any) => {
      for (let key in curr) dataObj[key].push(curr[key]);
    });
    return dataObj;
  }
}
