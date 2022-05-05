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
    title: {},
    type: {},
    label: {},
    color: {},
    xAxis: null,
    yAxis: null,
    chartType: 'column',
  };

  getOption(...args: any) {
    let value = this.options;
    for (let key of args) {
      if (key in value) value = value[key];
      else return null;
    }
    return value;
  }

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
        type: this.getOption('type', key),
        name: this.getOption('label', key),
        color: this.getOption('color', key),
      };
      return obj;
    });

    let xAxisArray: any = this.options['xAxis'];
    if (xAxisArray) {
      let type = typeof xAxisArray;
      if (type === 'string') xAxisArray = dataObj[xAxisArray];
    }

    // init chart
    this.chartOptions = {
      ...this.chartOptions,
      title: { text: '', ...this.options.title },
      xAxis: {
        categories: xAxisArray,
      },
      series,
      chart: {
        type: this.options.chartType,
      },
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
