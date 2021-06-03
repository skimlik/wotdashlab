export class PieChartData {
  constructor(public name: string, public value: number) {
  }

  valueOf = () => this.value;
}
