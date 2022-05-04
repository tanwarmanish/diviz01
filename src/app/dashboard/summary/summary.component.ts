import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css'],
})
export class SummaryComponent implements OnInit {
  summary = [
    {
      value: '100k',
      title: 'Visitors From USA',
      progress: '50%',
    },
    {
      value: '1M',
      title: 'Visitors From Europe',
      progress: '80%',
    },
    {
      value: '450k',
      title: 'Visitors From AU',
      progress: '45%',
    },
    {
      value: '1B',
      title: 'Visitors From IN',
      progress: '90%',
    },
  ];
  colors = ['#673ab7', '#4caf50', '#03a9f4', '#607d8b'];

  constructor() {}

  ngOnInit(): void {}
}
