import { Component, OnInit } from '@angular/core';
import { HighchartComponent } from 'src/app/shared/components/highchart/highchart.component';
import { PATH } from './../heatmap/heatmap.const';
@Component({
  selector: 'company-summary',
  templateUrl: './company-summary.component.html',
  styleUrls: ['./company-summary.component.css'],
})
export class CompanySummaryComponent
  extends HighchartComponent
  implements OnInit
{
  dataList: any = [
    {
      title: 'Notes',
      value: 90,
      total: 1000,
      leftLabel: 'Critical',
      rightLabel: 'Normal',
    },
    {
      title: 'Tasks',
      value: 134,
      total: 878,
      leftLabel: 'Complete',
      rightLabel: 'Incomplete',
    },
    {
      title: 'Companies',
      value: 342,
      total: 500,
      leftLabel: 'Customers',
      rightLabel: 'Carriers',
    },
    {
      title: 'Contacts',
      value: 2908,
      total: 4000,
      leftLabel: 'Customers',
      rightLabel: 'Carriers',
    },
    {
      title: 'Meetings',
      value: 150,
      total: 500,
      leftLabel: 'Calls',
      rightLabel: 'In Person',
    },
  ];
  paths = PATH;
  loadOrder: boolean = false;
  orderDetails = [];
  highlightKey: any = null;
  ngOnInit(): void {}

  ngAfterViewInit() {
    this.events.loadLane.subscribe((order: any) => {
      let { details, state } = order;
      console.log(details);
      this.loadOrder = state == 'order';
    });

    this.events.highlightRoute.subscribe((key) => {
      console.log(key);
      this.highlightKey = key;
    });
  }
}
