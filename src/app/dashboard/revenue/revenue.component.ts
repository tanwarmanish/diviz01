import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-revenue',
  templateUrl: './revenue.component.html',
  styleUrls: ['./revenue.component.css'],
})
export class RevenueComponent implements OnInit {
  timePeriods = [
    {
      key: 'day',
      title: 'Day',
    },
    {
      key: 'week',
      title: 'Week',
    },
    {
      key: 'month',
      title: 'Month',
    },
  ];

  activePeriod: string = 'month';
  constructor() {}

  ngOnInit(): void {}

  selectTimePeriod(period: any) {
    if (this.activePeriod == period.key) return;
    this.activePeriod = period.key;
  }
}
