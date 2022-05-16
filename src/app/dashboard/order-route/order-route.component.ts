import { Component, OnInit } from '@angular/core';
import { EventsService } from 'src/app/shared/services/events.service';
import { PATH } from '../heatmap/heatmap.const';

@Component({
  selector: 'order-route',
  templateUrl: './order-route.component.html',
  styleUrls: ['./order-route.component.css'],
})
export class OrderRouteComponent implements OnInit {
  highlightKey: any = null;
  paths = PATH;
  orderDetails = [];

  constructor(public events: EventsService) {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.events.loadLane.subscribe((order: any) => {
      let { details, state } = order;
      this.orderDetails = details;
    });

    this.events.highlightRoute.subscribe((key) => {
      this.highlightKey = key;
    });
  }
}
