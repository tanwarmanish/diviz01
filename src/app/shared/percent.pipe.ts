import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'percent',
})
export class PercentPipe implements PipeTransform {
  transform(dValue: any, value: number, total: number, inverse = false): any {
    if (!total) return dValue;
    let percent = Math.floor((value / total) * 100);
    return inverse ? 100 - percent : percent;
  }
}
