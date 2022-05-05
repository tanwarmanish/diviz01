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
        date: moment(startDate).add(index, 'days').format(),
      };
    });
    return data;
  }
}
