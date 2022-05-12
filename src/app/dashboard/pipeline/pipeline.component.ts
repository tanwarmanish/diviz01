import { Component, OnInit } from '@angular/core';
import { HighchartComponent } from 'src/app/shared/components/highchart/highchart.component';
import { DatasetService } from 'src/app/shared/services/faker/dataset.service';

@Component({
  selector: 'app-pipeline',
  templateUrl: './pipeline.component.html',
  styleUrls: ['./pipeline.component.css'],
})
export class PipelineComponent extends HighchartComponent implements OnInit {
  dataList: any = [];
  override chartType = 'funnel';

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
    this.publishChart();
  }

  initChartOptions() {
    let options = {
      series: [
        {
          name: 'Pipeline',
          key: 'stages',
          data: [],
        },
      ],
      chart: {
        type: this.chartType,
      },
      plotOptions: this.getPlotOptions(),
    };
    this.updateChartOptions(options);
  }

  publishChart() {
    let seriesObj = this.generateSeries(this.dataList);
    this.updateSeries(seriesObj);
  }

  getPlotOptions() {
    let type = this.chartType;
    let options = {};
    if (type == 'funnel') {
      options = {
        series: {
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b> ({point.y:,.0f})',
            softConnector: true,
          },
          center: ['40%', '40%'],
        },
      };
    }
    return options;
  }
}
