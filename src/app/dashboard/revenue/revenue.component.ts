import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-revenue',
  templateUrl: './revenue.component.html',
  styleUrls: ['./revenue.component.css'],
})
export class RevenueComponent implements OnInit {
  
  constructor() {}

  ngOnInit(): void {}

  onPeriodChange(period: string) {
    console.log(period);
  }
  onChartChange(type: string) {
    console.log(type);
  }
}
