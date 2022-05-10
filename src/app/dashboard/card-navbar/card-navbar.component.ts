import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Types, Periods } from './card-navbar.const';
@Component({
  selector: 'card-navbar',
  templateUrl: './card-navbar.component.html',
  styleUrls: ['./card-navbar.component.css'],
})
export class CardNavbarComponent implements OnInit {
  periodsList: any[] = Periods;
  typesList: any[] = Types;

  @Input() title = 'Card Navbar';
  @Input() activeType: string = '';
  @Input() activePeriod: string = '';
  @Input() periods: string = ''; // set to all to include all periods
  @Input() types: string = '';
  @Output() changePeriod = new EventEmitter();
  @Output() changeType = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  selectTimePeriod(period: any) {
    if (this.activePeriod == period) return;
    this.activePeriod = period;
    this.changePeriod.emit(period);
  }

  selectType(type: any) {
    this.activeType = type;
    this.changeType.emit(this.activeType);
  }

  ngOnChanges(changes: any) {
    if (changes && changes.periods) {
      const periodsArr = this.periods.toLowerCase().split('|');
      this.periodsList = periodsArr.map((key) =>
        Periods.find((period) => period.key == key)
      );
    }

    if (changes && changes.types && changes.types.currentValue) {
      let typesArr = this.types.split('|');
      this.typesList = typesArr.map((key) =>
        Types.find((type) => type.key == key)
      );
    }
  }
}
