import { Component, OnInit } from '@angular/core';
import { DatasetService } from 'src/app/shared/services/faker/dataset.service';

@Component({
  selector: 'quote-status',
  templateUrl: './quotes-status.component.html',
  styleUrls: ['./quotes-status.component.css'],
})
export class QuotesStatusComponent implements OnInit {
  dataList: any = [];
  chartOptions = {};
  chartType = 'pie';
  xAxis: any = [];

  constructor(private dataset: DatasetService) {}

  stages = ['Awarded', 'Pending', 'Lost', 'Quoted'];
  ngOnInit(): void {
    this.xAxis = this.dataset.getNames(5);
    this.initChartOptions();
    this.dataList = this.dataset.generateQuoteStatus(this.stages, 5);
  }

  initChartOptions() {
    this.chartOptions = {
      series: ['name', 'y'],
      label: {
        name: 'name',
        y: 'y',
        seriesName: 'Total',
      },
      xAxis: this.xAxis,
      chartType: this.chartType,
      chartOptions: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
      },
      plotOptions: this.getPlotOptions(),
    };
  }

  getPlotOptions() {
    let type = this.chartType;
    let options = {};
    if (type == 'stacked') {
      options = {
        column: {
          stacking: 'normal',
          dataLabels: {
            enabled: true,
          },
        },
      };
    } else if (type == 'pie') {
      options = {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          size: 250.0,
          center: ['50%', '50%'],
          dataLabels: {
            enabled: true,
            format:
              '<b>{point.name}</b>: {point.percentage:.1f} % <br>(Total: {point.y})',
          },
        },
      };
    }
    return options;
  }

  onPeriodChange(period: string) {
    console.log(period);
  }

  onChartChange(type: string) {
    this.chartType = type;
    this.initChartOptions();
  }
}
