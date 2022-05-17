import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDatepicker } from '@angular/material/datepicker';
import * as moment from 'moment';
import { HighchartComponent } from 'src/app/shared/components/highchart/highchart.component';
import { DatasetService } from 'src/app/shared/services/faker/dataset.service';

@Component({
  selector: 'app-revenue',
  templateUrl: './revenue.component.html',
  styleUrls: ['./revenue.component.css'],
})
export class RevenueComponent extends HighchartComponent implements OnInit {
  dataList: any = [];
  seriesObj: any = null;
  override chartType = 'column';
  override chartPeriod = 'day';
  override chartTypes = 'column|spline';
  override chartPeriods = 'day|week|month';
  _date: any = {
    min: null,
    max: null,
  };
  date(key: string) {
    return this._date[key];
  }

  averagesList: any[] = [
    {
      key: 'avgrevenue',
      src: 'revenue',
      title: 'Average Revenue',
      period: 7,
      checked: false,
      color: '#CFDDEA',
    },
    {
      key: 'avgexpense',
      src: 'expense',
      title: 'Average Expense',
      period: 7,
      checked: false,
    },
  ];

  ngOnInit(): void {
    let days = 1000;
    this._date.max = new Date(moment().format());
    this._date.min = new Date(moment().subtract(days, 'days').format());
    this.dataList = this.dataset.generateRevenueExpense(days);
    this.initChartOptions();
  }

  ngAfterViewInit() {
    this.publishChart();
  }

  initChartOptions() {
    let options = {
      xAxis: {
        type: 'datetime',
        labels: {
          format: '{value:%d %b<br>%Y}',
        },
        crosshair: {
          zIndex: 5,
          dashStyle: 'dot',
          snap: false,
          color: 'black',
        },
      },
      yAxis: {
        title: {
          text: '',
        },
        crosshair: {
          zIndex: 5,
          dashStyle: 'dot',
          snap: false,
          color: 'black',
        },
      },
      series: [
        {
          name: 'Average Expense',
          key: 'avgexpense',
          opacity: 0.35,
          type: 'areaspline',
          data: [],
          enableMouseTracking: false,
          showInLegend: false,
          visible: false,
          color: '#c23616',
        },
        {
          name: 'Average Revenue',
          key: 'avgrevenue',
          opacity: 0.35,
          type: 'areaspline',
          data: [],
          enableMouseTracking: false,
          showInLegend: false,
          visible: false,
          color: '#487eb0',
        },
        {
          name: 'Revenue',
          key: 'revenue',
          color: '#2ecc71',
          data: [],
        },
        {
          name: 'Expenses',
          key: 'expense',
          color: '#e74c3c',
          data: [],
        },
      ],
      chart: {
        type: this.chartType,
        panning: true,
        panKey: 'click',
      },
      plotOptions: {
        areaspline: {
          legend: {
            borderWidth: 2,
          },
          marker: {
            enabled: false,
          },
        },
        column: {
          borderWidth: 0,
        },
      },
      tooltip: {
        shared: true,
        followPointer: true,
      },
    };
    this.updateChartOptions(options);
  }

  getExtremes(series: [number, any]) {
    let range = 15;
    let length = series.length;
    let xMin = series[Math.max(length - 1 - range, 0)][0];
    let xMax = series[length - 1][0];
    return { xMin, xMax };
  }

  publishChart() {
    this.seriesObj = this.generateSeries(this.dataList);
    let { xMin, xMax } = this.getExtremes(this.seriesObj.revenue);
    this.axisExtremes(xMin, xMax);
    this.updateSeries(this.seriesObj);
    this.publishAverages();
  }

  override onPeriodChange(period: string) {
    this.chartPeriod = period;
    this.publishChart();
  }

  override onChartChange(type: string) {
    this.chartType = type;
    this.updateChartOptions({ chart: { type } });
  }

  toggleAverages(option: any, index: number) {
    let { period, checked } = option;
    // toggle state
    checked = !checked;
    this.averagesList[index] = { ...option, checked };

    // toggle average series
    if (!this.seriesObj) return;
    this.publishAverages();
  }

  publishAverages() {
    let avgSeriesObj: any = {};
    let avgHiddenObj: any = {};
    for (let index in this.averagesList) {
      let { key, src, checked, period } = this.averagesList[index];
      avgSeriesObj[key] = [];
      avgHiddenObj[key] = !checked;
      if (checked) {
        let payload: any = {
          [src]: this.seriesObj[src],
          date: this.seriesObj.date,
        };
        avgSeriesObj[key] = this.generateMVA(payload, period)[key];
      }
    }
    // update series
    this.updateSeries(avgSeriesObj, avgHiddenObj);
  }

  goToDate(value: any) {
    if (!value) return;
    let date = moment(value);
    let maxValue = date.valueOf();
    let minValue = date.subtract(15, 'days').valueOf();
    this.axisExtremes(minValue, maxValue);
  }
}
