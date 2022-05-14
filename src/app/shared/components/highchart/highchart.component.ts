import { ChangeDetectorRef, Component } from '@angular/core';
import { DatasetService } from '../../services/faker/dataset.service';
import * as moment from 'moment';

import * as Highcharts from 'highcharts';
import Exporting from 'highcharts/modules/exporting';
import Funnel from 'highcharts/modules/funnel';
import Drilldown from 'highcharts/modules/drilldown';
/* init */
Funnel(Highcharts);
Exporting(Highcharts);
Drilldown(Highcharts);

@Component({ template: '' })
export class HighchartComponent {
  public Highcharts: typeof Highcharts = Highcharts;
  public chartOptions: any = {
    title: { text: '' },
    yAxis: {
      title: {
        text: '',
      },
    },
    xAxis: {},
    exporting: {
      enabled: false,
    },
  };
  public chartStyle = 'width: 100%; height: 360px; display: block';
  public chartType = '';
  public chartPeriod = '';
  public chartTypes = '';
  public chartPeriods = '';
  private _axis: any = {
    xAxis: true,
    yAxis: true,
  };

  public chartRef: any = null;

  constructor(public cd: ChangeDetectorRef, public dataset: DatasetService) {}

  public onPeriodChange(period: string) {}

  public onChartChange(type: string) {}

  public chartInstance($event: any) {
    this.chartRef = $event;
  }

  copy(data: any) {
    return JSON.parse(JSON.stringify(data));
  }

  applyPeriod(dataList: any[]) {
    let type = this.chartPeriod || [];
    switch (type) {
      case 'day':
        return dataList;
      case 'week':
      case 'month':
      case 'year':
        return this.groupBy(dataList, type);
    }
    return dataList;
  }

  generateSeries(dataList: any[]) {
    if (dataList.length == 0) return {};
    dataList = this.copy(dataList);
    dataList = this.applyPeriod(dataList);
    let keys = Object.keys(dataList[0]);
    let dataObj: any = keys.reduce((o, k) => Object.assign(o, { [k]: [] }), {});
    dataList.forEach((ele) =>
      keys.forEach((key) => dataObj[key].push(ele[key]))
    );
    return dataObj;
  }

  updateChartOptions(options: any) {
    let chartOptions = {
      ...this.chartOptions,
      ...options,
    };
    // toggle axis if required
    chartOptions = this.toggleAxis(chartOptions);
    this.chartOptions = chartOptions;
    if (chartOptions.chart.type == 'pie') console.log(chartOptions);
  }

  updateSeries(seriesObj: any, hidden: any = {}) {
    let series = this.chartOptions.series;
    series.forEach((s: any) => {
      if (seriesObj.hasOwnProperty(s.key)) {
        let data = seriesObj[s.key];
        s.data = data;
        s.visible = !hidden[s.key];
      }
    });
    this.updateChartOptions({ series });
  }

  updateXAxis(series: any[], isDate = false) {
    series = this.copy(series);

    // generate labels
    isDate && (series = this.generateDateAxisLabel(series));

    let xAxis = this.chartOptions.xAxis;
    xAxis = {
      ...xAxis,
      categories: series,
    };
    this.updateChartOptions({ xAxis });
  }

  /* group by */
  groupBy(dataList: any[], key: any = 'week') {
    let months = dataList.map((entry) =>
      moment(entry.date).startOf(key).valueOf()
    );
    let slowPtr = 0,
      fastPtr = 0;
    while (slowPtr < dataList.length) {
      while (months[slowPtr] == months[fastPtr]) {
        if (slowPtr != fastPtr)
          for (let key in dataList[slowPtr]) {
            if (key != 'date')
              dataList[slowPtr][key][1] += dataList[fastPtr][key][1];
          }
        fastPtr++;
      }
      slowPtr++;
      while (slowPtr != fastPtr) {
        dataList[slowPtr] = null;
        slowPtr++;
      }
    }
    return dataList.filter((entry) => entry);
  }

  generateDateAxisLabel(series: any[]) {
    // let type: any = this.chartType;
    let format = 'DD/MM/YYYY';
    series = series.map((date) => {
      if (
        moment(date).format(format) ==
        moment(date).startOf('month').format(format)
      ) {
        return moment(date).format('MMM');
      } else {
        return moment(date).format('DD MMM,YY');
      }
      // return 1;
    });
    return series;
  }

  axis(xAxis = true, yAxis = true) {
    this._axis = { xAxis, yAxis };
  }

  toggleAxis(options: any) {
    let xAxis = options['xAxis'] || {};
    let yAxis = options['yAxis'] || {};
    xAxis = { ...xAxis, visible: this._axis.xAxis };
    yAxis = { ...yAxis, visible: this._axis.yAxis };
    return { ...options, xAxis, yAxis };
  }

  drillUp() {
    this.chartRef && this.chartRef.drillUp();
  }

  axisExtremes(min = null, max = null, revert = false) {
    this.chartRef && this.chartRef.xAxis[0].setExtremes(min, max);
  }

  // moving average
  generateMVA(dataObj: any, average: number) {
    for (let key in dataObj) {
      if (key != 'date') {
        let arr = this.copy(dataObj[key]);
        for (let i = arr.length - 1; i >= 0; i--) {
          let j = i - 1;
          let count = 1;
          while (j > i - average && j >= 0) {
            arr[i][1] += arr[j][1];
            count++;
            j--;
          }
          arr[i][1] /= count;
        }
        dataObj[`avg${key}`] = arr;
      }
    }
    return dataObj;
  }
}
