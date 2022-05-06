import { Component, OnInit } from '@angular/core';
import { DatasetService } from 'src/app/shared/services/faker/dataset.service';

@Component({
  selector: 'app-pipeline',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css'],
})
export class SummaryComponent implements OnInit {
  dataList: any = [];
  chartOptions = {};
  chartType = 'funnel';
  summary = [
    {
      value: '100k',
      title: 'Visitors From USA',
      progress: '50%',
    },
    {
      value: '1M',
      title: 'Visitors From Europe',
      progress: '80%',
    },
    {
      value: '450k',
      title: 'Visitors From AU',
      progress: '45%',
    },
    {
      value: '1B',
      title: 'Visitors From IN',
      progress: '90%',
    },
  ];
  colors = ['#673ab7', '#4caf50', '#03a9f4', '#607d8b'];

  constructor(private dataset: DatasetService) {}

  stages = [
    'Leads',
    'Fav. Stage of the Companies',
    'Qualified',
    'Customers',
    'Prospects',
  ];
  ngOnInit(): void {
    this.initChartOptions();
    this.dataList = this.dataset.generatePipeline(this.stages);
  }

  initChartOptions() {
    this.chartOptions = {
      series: ['name', 'y'],
      label: {
        name: 'name',
        y: 'y',
      },
      chartType: this.chartType,
      plotOptions: {
        series: {
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b> ({point.y:,.0f})',
            softConnector: true,
          },
          center: ['40%', '50%'],
          neckWidth: '30%',
          neckHeight: '25%',
          width: '70%',
        },
      },
    };
  }
}
