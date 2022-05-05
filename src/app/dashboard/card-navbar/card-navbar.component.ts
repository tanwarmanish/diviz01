import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Icons, Periods } from './card-navbar.const';
@Component({
  selector: 'card-navbar',
  templateUrl: './card-navbar.component.html',
  styleUrls: ['./card-navbar.component.css'],
})
export class CardNavbarComponent implements OnInit {
  periodsList: any[] = Periods;
  iconsObj: any = Icons;
  iconsArr: any[] = [];

  activePeriod: string = '';
  activeIcon: string = '';

  @Input() title = 'Card Navbar';
  @Input() periods = ''; // set to all to include all periods
  @Input() icons = '';
  @Output() changePeriod = new EventEmitter();
  @Output() changeIcon = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  selectTimePeriod(period: any) {
    if (this.activePeriod == period.key) return;
    this.activePeriod = period.key;
    this.changePeriod.emit(this.activePeriod);
  }

  selectIcon(icon: any) {
    this.activeIcon = icon;
    this.changeIcon.emit(this.activeIcon);
  }

  ngOnChanges(changes: any) {
    if (changes && changes.periods) {
      const periods = this.periods.toLowerCase();
      if (periods === 'all') {
        this.periodsList = Periods;
      } else {
        const periodsArr = periods.split('|');
        this.periodsList = Periods.filter((p) => periodsArr.includes(p.key));
      }
      this.activePeriod = this.periodsList.length
        ? this.periodsList[0].key
        : '';
    }

    if (changes && changes.icons && changes.icons.currentValue) {
      this.iconsArr = this.icons.split('|');
      this.activeIcon = this.iconsArr.length ? this.iconsArr[0] : '';
    }
  }
}
