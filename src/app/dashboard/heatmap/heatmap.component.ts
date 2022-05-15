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
  typeKeys: any = [];
  activeType: string = 'customer';
  seriesData: any = {};
  colorAxis: any = {};
  tracking: boolean = false;

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
          [type.key]: this.generateColorAxis(type.key),
        }),
      {}
    );
    this.seriesData['trackorder'] = [];
    this.colorAxis['trackorder'] = {};
    this.typeKeys = Object.keys(this.seriesData);
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
        visible: false,
        labels: { enabled: false },
        tickLength: 0,
        gridLineWidth: 0,
      },

      colorAxis: { dataClasses: this.colorAxis[this.activeType] },
      plotOptions: {
        series: {
          dataLabels: {
            enabled: true,
            format: '{point.hc-a2}<br>{point.path}',
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
        {
          name: 'Order',
          showInLegend: false,
          data: this.seriesData['trackorder'],
          visible: false,
          tooltip: {
            headerFormat: '',
            pointFormat: '<b>{point.name}: {point.value}</b>',
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

  generateColorAxis(key: string) {
    if (key === 'trackorder') return this.generateColorAxisPath();
    const series = this.seriesData[key];
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
    return axis;
  }

  generateColorAxisPath() {
    let axis = [0].map(() => {
      let payload = {
        from: Number.NEGATIVE_INFINITY,
        to: Number.POSITIVE_INFINITY,
        name: '',
        color: '#000',
      };
      return payload;
    });
    return axis;
  }

  onTypeChange(type: string) {
    this.activeType = type;
    this.chartRef.colorAxis[0].update({
      dataClasses: this.colorAxis[this.activeType],
    });
    let index = this.typeKeys.indexOf(type);
    this.typeKeys.map((k: any, i: number) => {
      let payload: any = {
        visible: i == index,
        data: i == index ? this.seriesData[k] : [],
      };
      this.chartRef.series[i].update(payload);
    });
  }

  loadQuote(id: any) {
    let key = 'trackorder';
    this.tracking = true;
    this.seriesData[key] = this.trackQuote(id);
    this.colorAxis[key] = this.generateColorAxis(key);
    this.onTypeChange(key);
  }
  closeQuote() {
    this.tracking = false;
    this.seriesData['trackorder'] = [];
    this.colorAxis['trackorder'] = [];
    this.onTypeChange('customer');
  }

  trackQuote(id: number) {
    let path: any = [
      {
        key: 'ND',
        title: 'O',
        src: 'origin',
      },
      {
        key: 'WY',
        title: 'S1',
        src: 'stop',
      },
      {
        key: 'CO',
        title: 'S2',
        src: 'stop',
      },
      {
        key: 'UT',
        title: 'S3',
        src: 'stop',
      },
      {
        key: 'OK',
        title: 'S4',
        src: 'stop',
      },
      {
        key: 'LA',
        title: 'S5',
        src: 'stop',
      },
      {
        key: 'MS',
        title: 'S6',
        src: 'stop',
      },
      {
        key: 'AL',
        title: 'S7',
        src: 'stop',
      },
      {
        key: 'GA',
        title: 'S8',
        src: 'stop',
      },
      {
        key: 'FL',
        title: 'D',
        src: 'dest',
      },
    ];
    const colors: any = {
      rest: '#000',
      origin: '#2ecc71',
      stop: '#1abc9c',
      dest: '#e74c3c',
    };
    path = path.map((p: any) => Object.assign(p, { color: colors[p.src] }));
    return this.dataset.generateHeatmapData(STATES, path);
  }
}
