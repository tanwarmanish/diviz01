import { Component, OnInit } from '@angular/core';
import { DatasetService } from 'src/app/shared/services/faker/dataset.service';

@Component({
  selector: 'app-revenue',
  templateUrl: './revenue.component.html',
  styleUrls: ['./revenue.component.css'],
})
export class RevenueComponent implements OnInit {
  dataList: any = [];
  chartOptions = {};
  chartType: string = 'spline';

  constructor(private dataset: DatasetService) {
    this.initChartOptions();
    this.dataList = this.dataset.generateRevenueExpense(10);
  }

  initChartOptions() {
    this.chartOptions = {
      series: ['revenue', 'expense'],
      label: {
        revenue: 'Revenue',
        expense: 'Expense',
      },
      color: {
        revenue: '#2ecc71',
        expense: '#e74c3c',
      },
      chartType: this.chartType,
      xAxis: 'date',
    };
  }

  ngOnInit(): void {}

  onPeriodChange(period: string) {
    console.log(period);
  }

  onChartChange(type: string) {
    this.chartType = type;
    this.initChartOptions();
  }
}
