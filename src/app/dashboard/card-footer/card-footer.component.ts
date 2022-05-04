import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'card-footer',
  templateUrl: './card-footer.component.html',
  styleUrls: ['./card-footer.component.css'],
})
export class CardFooterComponent implements OnInit {
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
