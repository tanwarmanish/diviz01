import { Component, OnInit } from '@angular/core';
import { HighchartComponent } from 'src/app/shared/components/highchart/highchart.component';
import { STATES } from './heatmap.const';
@Component({
  selector: 'heatmap',
  templateUrl: './heatmap.component.html',
  styleUrls: ['./heatmap.component.css'],
})
export class HeatmapComponent extends HighchartComponent implements OnInit {
  override chartStyle = 'width: 100%; height: 500px; display: block';
  types: any[] = [
    { key: 'customer', value: 'Customers' },
    { key: 'carrier', value: 'Carriers' },
  ];
  activeType: string = 'customer';
  seriesData: any = {};
  colorAxis: any = {};

  ngOnInit(): void {
    this.seriesData = this.types.reduce(
      (o: any, type: any) =>
        Object.assign(o, {
          [type.key]: this.dataset.generateHeatmapData(STATES),
        }),
      {}
    );
    this.colorAxis = this.types.reduce(
      (o: any, type: any) =>
        Object.assign(o, {
          [type.key]: this.generateColorAxis(this.seriesData[type.key]),
        }),
      {}
    );
    this.initChartOptions();
  }

  initChartOptions() {
    let options = {
      chart: {
        type: 'tilemap',
        inverted: true,
      },
      xAxis: {
        visible: false,
        labels: { enabled: false },
        tickLength: 0,
        lineWidth: 0,
      },
      yAxis: {
        title: { text: '' },
        visible: true,
        labels: { enabled: false },
        tickLength: 0,
        gridLineWidth: 0,
      },

      colorAxis: { dataClasses: this.colorAxis[this.activeType] },
      plotOptions: {
        series: {
          dataLabels: {
            enabled: true,
            format: '{point.hc-a2}',
            color: '#000000',
            style: {
              textOutline: false,
            },
          },
        },
      },
      series: [
        {
          name: 'Origin',
          showInLegend: false,
          data: this.seriesData['customer'],
          visible: true,
          tooltip: {
            headerFormat: '',
            pointFormat:
              'The Customers originating from <b> {point.name}</b> are <b>{point.value}</b>',
          },
        },
        {
          name: 'Origin',
          showInLegend: false,
          data: this.seriesData['carrier'],
          visible: false,
          tooltip: {
            headerFormat: '',
            pointFormat:
              'The Carriers originating from <b> {point.name}</b> are <b>{point.value}</b>',
          },
        },
      ],
    };
    this.updateChartOptions(options);
  }

  generateBins(series: any, bins = 4) {
    let values = series.map((s: any) => s.value);
    let [minValue, maxValue] = [Math.min(...values), Math.max(...values)];
    let binWidth = Math.floor((maxValue - minValue) / bins);
    return [...new Array(4)].map((_: any, i: number) => [
      i * binWidth,
      (i + 1) * binWidth,
    ]);
  }

  generateColorAxis(series: any) {
    let colors = ['#F9EDB3', '#FFC428', '#FF7987', '#FF2371'];
    let bins = this.generateBins(series, colors.length);
    let axis = colors.map((color: string, i: number) => {
      let [from, to] = bins[i];
      let name = `${from} - ${to}`;
      i == 0 && (name = `< ${to}`);
      i == colors.length - 1 && (name = `> ${from}+`);
      let payload = {
        from,
        to,
        color,
        name,
      };
      return payload;
    });
    console.log(axis);
    return axis;
  }

  onTypeChange(type: string) {
    this.activeType = type;
    this.chartRef.colorAxis[0].update({
      dataClasses: this.colorAxis[this.activeType],
    });

    let index = type == 'customer' ? 0 : 1;
    [0, 1].map((i: number) => {
      this.chartRef.series[i].update({ visible: i == index });
    });
  }
}
