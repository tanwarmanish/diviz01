import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'select-dropdown',
  templateUrl: './select-dropdown.component.html',
  styleUrls: ['./select-dropdown.component.css'],
})
export class SelectDropdownComponent implements OnInit {
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

  @Input() dataList: any[] = [];
  @Input() dataKeys = { key: 'key', value: 'value' };
  @Input() selectedValue: string = '';
  @Input() selectedValueLabel: string = '';

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: any) {
    if (changes && changes.selectedValue && this.selectedValueLabel) {
      this.selectedValueLabel = this.selectedValue;
    }
  }
}