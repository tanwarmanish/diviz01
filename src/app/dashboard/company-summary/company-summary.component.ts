import { Component, OnInit } from '@angular/core';
import { HighchartComponent } from 'src/app/shared/components/highchart/highchart.component';

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
      title: 'Contacts',
      value: 342,
      total: 500,
      leftLabel: 'Active',
      rightLabel: 'Inactive',
    },
    {
      title: 'Meetings',
      value: 150,
      total: 500,
      leftLabel: 'Calls',
      rightLabel: 'In Person',
    },
  ];
  ngOnInit(): void { }
  
}
