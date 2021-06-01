export class UnixDateService {
  static fromUnixDate(value: number): Date {
    return new Date(value * 1000);
  }

  static toUnixDate(date: Date): number {
    return +(date.getTime() / 1000).toFixed(0);
  }
}
