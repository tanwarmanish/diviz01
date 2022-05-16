import { Component, OnInit } from '@angular/core';
import { HighchartComponent } from 'src/app/shared/components/highchart/highchart.component';

@Component({
  selector: 'quote-status',
  templateUrl: './quotes-status.component.html',
  styleUrls: ['./quotes-status.component.css'],
})
export class QuotesStatusComponent
  extends HighchartComponent
  implements OnInit
{
  dataList: any = [];
  override chartType = 'pie';
  override chartTypes = 'pie|column|stacked';

  statues = ['Quoted', 'Pending', 'Awarded', 'Lost'];
  quotesTypes = ['LTL', 'FTL', 'IM', 'LCL'];
  ngOnInit(): void {
    this.initChartOptions();
    this.dataList = this.dataset.generateQuoteStatus(
      this.statues,
      this.quotesTypes
    );
    this.publishChart();
  }

  initChartOptions() {
    let options = {
      series: [],
      chart: {
        type: this.chartType,
      },
      plotOptions: {},
    };
    this.updateChartOptions(options);
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
            format: '{point.y}',
          },
        },
      };
    } else if (type == 'column') {
      options = {
        column: {
          stacking: false,
          dataLabels: {
            enabled: true,
            format: '{point.y}',
          },
        },
      };
    } else if (type == 'pie') {
      options = {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          size: 230.0,
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

  publishChart() {
    let type = this.chartType === 'stacked' ? 'column' : this.chartType;
    let options = {
      drilldown: {},
      plotOptions: this.getPlotOptions(),
      chart: { type },
    };
    this.drillUp();
    switch (this.chartType) {
      case 'column':
      case 'stacked': {
        this.axis(true, true);
        options = Object.assign(options, this.generateColumnsData());
        break;
      }
      case 'pie': {
        this.axis(false, false);
        options = Object.assign(options, this.generatePieData());
        break;
      }
    }
    this.updateChartOptions(options);
  }

  override onChartChange(type: string) {
    this.chartType = type;
    this.publishChart();
  }

  generateColumnsData() {
    let arr = this.copy(this.dataList);
    let xAxis = arr.map((o: any) => o.key);
    let children = arr[0].children.map((o: any) => o.key);
    let series = children.map((k: string) =>
      Object.assign({ name: k, data: [] })
    );
    for (let pIndex in arr) {
      for (let cIndex in arr[pIndex].children) {
        series[cIndex].data[pIndex] = arr[pIndex].children[cIndex].value;
      }
    }
    return { series, xAxis: { categories: xAxis } };
  }

  generatePieData() {
    let arr = this.copy(this.dataList);
    let series = [
      {
        name: 'Quotes',
        colorByPoint: true,
        data: arr.map((o: any) => {
          return {
            name: o.key,
            y: o.value,
            drilldown: o.children.length ? o.key : null,
          };
        }),
      },
    ];

    let drilldown = arr.map((o: any) => {
      return {
        name: o.key,
        id: o.key,
        data: o.children.map((c: any) => {
          return [c.key, c.value];
        }),
      };
    });
    return {
      series,
      drilldown: { series: drilldown },
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie',
      },
    };
  }
}
