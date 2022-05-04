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
