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
    let data: any = [...new Array(count)];
    let startDate = moment().subtract(10, 'days');
    data = data.map((_: any, index: number) => {
      return {
        revenue: +faker.finance.amount(),
        expense: +faker.finance.amount(),
        date: moment(startDate).add(index, 'days').format('DD/MM'),
      };
    });
    return data;
  }

  generatePipeline(stages: string[]) {
    let values = stages
      .map((_) => Math.floor(+faker.finance.amount()))
      .sort((a, b) => b - a);

    return values.map((y, i) => {
      return {
        name: stages[i],
        y,
      };
    });
  }
}
