import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'card-navbar',
  templateUrl: './card-navbar.component.html',
  styleUrls: ['./card-navbar.component.css'],
})
export class CardNavbarComponent implements OnInit {
  timePeriods = [
    {
      key: 'day',
      value: 'Day',
    },
    {
      key: 'week',
      value: 'Week',
    },
    {
      key: 'month',
      value: 'Month',
    },
    {
      key: 'year',
      value: 'Year',
    },
  ];
  activePeriod: string = 'day';

  constructor() {}

  ngOnInit(): void {}

  selectTimePeriod(period: any) {
    if (this.activePeriod == period.key) return;
    this.activePeriod = period.key;
  }
}
