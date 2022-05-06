import { Component, Input, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import Exporting from 'highcharts/modules/exporting';
import funnel from 'highcharts/modules/funnel';

funnel(Highcharts);
Exporting(Highcharts);

@Component({
  selector: 'chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
})
export class ChartComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  @Input() chartOptions: any = {};
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
  loading: boolean = false;

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
      this.loading = false;
      this.initChart();
    }
  }

  initChart() {
    let dataObj = this.extractColumns(this.dataList);
    let chartType = this.options.chartType;
    let preprocess = this.isPreprocessingRequired(chartType);
    let series = this.options.series.map((key: string) => {
      let obj = {
        data: dataObj[key],
        type: this.getOption('type', key),
        name: this.getOption('label', key),
        color: this.getOption('color', key),
      };
      return obj;
    });
    if (preprocess) {
      series = this.preprocessSeries(chartType, series);
    }
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
        type: chartType,
      },
      plotOptions: this.getOption('plotOptions') || {},
      exporting: {
        enabled: false,
      },
    };
    this.loading = true;
  }

  isPreprocessingRequired(type: string) {
    switch (type) {
      case 'funnel':
      case 'pie':
        return true;
    }
    return false;
  }

  preprocessSeries(type: string, series: any[]) {
    switch (type) {
      case 'funnel':
        return this.preprocessFunnel(series);
      case 'pie':
        return this.preprocessPie(series);
    }
    return [];
  }

  preprocessFunnel(series: any[]) {
    if (series.length != 2) return series;
    let options = series[0];
    let totalEntries = series[0].data.length;
    let seriesData = [];
    for (let i = 0; i < totalEntries; i++) {
      let temp = [];
      for (let k in series) temp.push(series[k].data[i]);
      seriesData.push(temp);
    }

    let response = {
      ...options,
      name: this.getOption('label', 'seriesName'),
      data: seriesData,
    };

    return [response];
  }

  preprocessPie(series: any[]) {
    if (series.length != 2) return series;
    let options = series[0];
    let seriesData = [];
    let totalEntries = series[0].data.length;
    for (let i = 0; i < totalEntries; i++) {
      let obj = {};
      for (let k in series) {
        let o = series[k];
        obj = {
          ...obj,
          [o.name]: o.data[i],
        };
      }
      seriesData.push(obj);
    }
    let response = {
      ...options,
      colorByPoint: true,
      name: this.getOption('label', 'seriesName'),
      data: seriesData,
    };
    return [response];
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
