import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'unixDate'
})

export class UnixDatePipe implements PipeTransform {
  transform(value: number, ...args: any[]): any {
    if (value) {
      return new Date(value * 1000);
    }
    return value;
  }
}
