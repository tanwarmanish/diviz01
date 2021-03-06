import { Injectable } from '@angular/core';
import { faker } from '@faker-js/faker';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class DatasetService {
  seed = 123;
  faker = faker;

  constructor() {}

  ngOnInit() {
    this.faker.seed(this.seed);
  }

  generateRevenueExpense(count: number = 10) {
    let data: any = [];
    let startDate = moment().subtract(count, 'days');
    data = [...new Array(count)].map((_: any, index: number) => {
      let date = moment(startDate).add(index, 'days').valueOf();
      return {
        revenue: [date, +faker.finance.amount()],
        expense: [date, +faker.finance.amount()],
        date,
      };
    });
    return data;
  }

  generatePipeline(stages: string[]) {
    let values = stages
      .map((_) => Math.floor(+faker.finance.amount()))
      .sort((a, b) => b - a);

    return values.map((y, i) => {
      return { stages: [stages[i], y] };
    });
  }

  generateQuoteStatus(parent: string[], children: string[]) {
    return parent.map((pKey, i) => {
      let data = [...new Array(parent.length)].map((i) =>
        Math.floor(+faker.finance.amount())
      );
      return {
        key: pKey,
        value: data.reduce((s, v) => s + v, 0),
        children: children.map((cKey, j) => {
          return {
            key: children[j],
            value: data[j],
          };
        }),
      };
    });
  }

  getNames(count: number) {
    return [...new Array(count)].map((i) => faker.name.firstName());
  }

  generateHeatmapData(states: any[], path: any = null) {
    let stateKeys = path ? path.map((p: any) => p.key) : [];
    return states.map((state) => {
      let value = Math.floor(+faker.finance.amount(1));
      let color = null;
      let title = '';
      // if track order
      if (path) {
        let index = stateKeys.indexOf(state['hc-a2']);
        if (index + 1) {
          value = 1000;
          color = path[index].color;
          title = `( ${path[index].title} )`;
        } else value = 0;
      }

      return { ...state, value, color, path: title };
    });
  }
}
