import { ChangeDetectorRef, Component } from '@angular/core';
import { DatasetService } from '../../services/faker/dataset.service';

import * as Highcharts from 'highcharts';
import Exporting from 'highcharts/modules/exporting';
import funnel from 'highcharts/modules/funnel';

/* init */
funnel(Highcharts);
Exporting(Highcharts);

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
  public chartType = 'line';
  public chartPeriod = 'day';
  public chartTypes = '';
  public chartPeriods = '';

  constructor(public cd: ChangeDetectorRef, public dataset: DatasetService) {}

  generateSeries(dataList: any[]) {
    if (dataList.length == 0) return {};
    let keys = Object.keys(dataList[0]);
    let dataObj: any = keys.reduce((o, k) => Object.assign(o, { [k]: [] }), {});
    dataList.forEach((ele) =>
      keys.forEach((key) => dataObj[key].push(ele[key]))
    );
    return dataObj;
  }

  updateChartOptions(options: any) {
    this.chartOptions = {
      ...this.chartOptions,
      ...options,
    };
  }

  updateSeries(seriesObj: any) {
    let series = this.chartOptions.series;
    series.forEach((s: any) => {
      let data = seriesObj[s.key];
      s.data = data;
    });
    this.updateChartOptions({ series });
  }
}
