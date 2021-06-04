import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'unixDate',
  pure: true,
})

export class UnixDatePipe implements PipeTransform {
  transform(value: number, ...args: any[]): any {
    if (value) {
      return new Date(value * 1000);
    }
    return value;
  }
}
