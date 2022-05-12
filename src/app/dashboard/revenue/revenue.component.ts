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
  override chartType = 'spline';
  override chartPeriod = 'day';
  override chartTypes = 'column|spline';
  override chartPeriods = 'day|week|month';

  ngOnInit(): void {
    this.initChartOptions();
    this.dataList = this.dataset.generateRevenueExpense(365);
    this.publishChart();
  }

  initChartOptions() {
    let options = {
      xAxis: {
        categories: [],
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
      },
    };
    this.updateChartOptions(options);
  }

  publishChart() {
    let seriesObj = this.generateSeries(this.dataList);
    this.updateSeries(seriesObj);
    this.updateXAxis(seriesObj.date, true);
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
