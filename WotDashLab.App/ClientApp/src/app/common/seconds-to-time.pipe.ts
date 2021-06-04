import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'secondsToTime',
  pure: true
})

export class SecondsToTimePipe implements PipeTransform {
  transform(value: number, ...args: any[]): any {
    if (value) {
      let minutes = Math.floor(value / 60);
      const seconds = value % 60;

      let hours = Math.floor(minutes / 60);
      minutes = minutes % 60;

      let days = Math.floor(hours / 24);
      hours = hours % 24;

      return `${days} days ${hours} hrs ${minutes} min. ${seconds} sec.`
    }
    return value;
  }
}
