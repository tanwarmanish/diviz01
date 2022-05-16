import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  loadLane = new Subject();
  highlightRoute = new Subject();
  constructor() {}
}
