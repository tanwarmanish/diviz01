import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HighchartComponent } from 'src/app/shared/components/highchart/highchart.component';
import { DatasetService } from 'src/app/shared/services/faker/dataset.service';

@Component({
  selector: 'app-revenue',
  templateUrl: './revenue.component.html',
  styleUrls: ['./revenue.component.css'],
})
export class RevenueComponent extends HighchartComponent implements OnInit {
  dataList: any = [];
  override chartType = 'column';
  override chartPeriod = 'day';
  override chartTypes = 'column|spline';
  override chartPeriods = 'day|week|month';

  ngOnInit(): void {
    this.dataList = this.dataset.generateRevenueExpense(365);
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
          format: '{value:%d-%m-%Y}',
        },
      },
      series: [
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
    let seriesObj = this.generateSeries(this.dataList);
    let { xMin, xMax } = this.getExtremes(seriesObj.revenue);
    this.updateSeries(seriesObj);
    this.axisExtremes(xMin, xMax);
  }

  override onPeriodChange(period: string) {
    this.chartPeriod = period;
    this.publishChart();
  }

  override onChartChange(type: string) {
    this.chartType = type;
    this.updateChartOptions({ chart: { type } });
  }
}
