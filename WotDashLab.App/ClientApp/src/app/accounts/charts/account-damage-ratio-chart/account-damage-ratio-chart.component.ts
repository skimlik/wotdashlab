import { ChangeDetectionStrategy, Component, ElementRef, Input, OnInit } from '@angular/core';
import { LightGreenColor, RedColor } from "../../../common/constants/color-palette";
import { PieChartService } from "../../../common/charts/pie/pie-chart.service";
import { PieChartData } from "../../../common/charts/pie/pie-chart-data";
import { IPieChartOptions } from "../../../common/charts/pie/pie-chart-options";

@Component({
  selector: 'app-account-damage-ratio-chart',
  templateUrl: 'account-damage-ratio-chart.component.html',
  styleUrls: ['../common-chart-styles.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AccountDamageRatioChartComponent implements OnInit {
  private _size = 180;
  private _innerRadius = 15;

  @Input() damageReceived: number;
  @Input() damageDealt: number;

  private _colors = [RedColor, LightGreenColor];

  constructor(private elementRef: ElementRef, private pieChart: PieChartService) {
  }

  ngOnInit() {
    const host = this.elementRef.nativeElement.querySelector('.parent-container svg');
    if (host) {
      const data: PieChartData[] = [
        new PieChartData('Received', this.damageReceived),
        new PieChartData('Dealt', this.damageDealt),
      ];

      const options: IPieChartOptions = {
        width: this._size,
        height: this._size,
        colors: this._colors,
        innerRadius: this._innerRadius
      };
      this.pieChart.create(host, options, data);
    }
  }

  get total(): number {
    return this.damageReceived + this.damageDealt;
  }

  get ratio(): number {
    return !this.total ? 0 : this.damageDealt / this.total;
  }
}
