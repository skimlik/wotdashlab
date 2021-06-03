import { AfterViewInit, Component, ElementRef, Input } from '@angular/core';
import { PieChartService } from "../../../common/charts/pie/pie-chart.service";
import { PieChartData } from "../../../common/charts/pie/pie-chart-data";
import { IPieChartOptions } from "../../../common/charts/pie/pie-chart-options";
import { GreenColor, LightGreenColor, RedColor } from "../../../common/constants/color-palette";

@Component({
  selector: 'app-account-win-rate-chart',
  templateUrl: 'account-win-rate-chart.component.html',
  styleUrls: ['account-win-rate-chart.component.scss']
})

export class AccountWinRateChartComponent implements AfterViewInit {
  private _size = 200;

  @Input() wins: number;
  @Input() draws: number;
  @Input() losses: number;

  colors = [LightGreenColor, RedColor, GreenColor];

  constructor(private pieChart: PieChartService, private elementRef: ElementRef) {
  }

  ngAfterViewInit(): void {
    const host = this.elementRef.nativeElement.querySelector('.account-win-rate-chart-container svg');
    if (host) {
      const data: PieChartData[] = [
        new PieChartData('Wins', this.wins),
        new PieChartData('Losses', this.losses),
        new PieChartData('Draws', this.draws),
      ];

      const options: IPieChartOptions = {
        width: this.size,
        height: this.size,
        colors: this.colors,
        innerRadius: 35
      };

      this.pieChart.create(host, options, data);
    }
  }

  get size(): number {
    return this._size;
  }
}
