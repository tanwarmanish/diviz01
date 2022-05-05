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
  chartType: string = 'column';

  constructor(private dataset: DatasetService) {
    this.initChartOptions();
    this.dataList = this.dataset.generateRevenueExpense(50);
  }

  initChartOptions() {
    this.chartOptions = {
      series: ['revenue', 'expense'],
      labels: {
        revenue: 'Revenue',
        expense: 'Expenses',
      },
      type: this.chartType,
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
