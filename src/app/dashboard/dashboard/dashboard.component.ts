import { Component, OnInit } from '@angular/core';
import { EventsService } from 'src/app/shared/services/events.service';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  summaryState = 'order';
  constructor(public events: EventsService) {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.events.loadLane.subscribe((order: any) => {
      let { state } = order;
      console.log(order);
      // FT1201202121
      this.summaryState = state;
    });
  }
}
