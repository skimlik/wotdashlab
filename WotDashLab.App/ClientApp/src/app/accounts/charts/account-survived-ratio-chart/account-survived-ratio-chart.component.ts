import { ChangeDetectionStrategy, Component, ElementRef, Input, OnInit } from '@angular/core';
import { LightGreenColor, RedColor } from "../../../common/constants/color-palette";
import { PieChartService } from "../../../common/charts/pie/pie-chart.service";
import { PieChartData } from "../../../common/charts/pie/pie-chart-data";
import { IPieChartOptions } from "../../../common/charts/pie/pie-chart-options";

@Component({
  selector: 'app-account-survived-ratio',
  templateUrl: 'account-survived-ratio-chart.component.html',
  styleUrls: ['account-survived-ratio-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class AccountSurvivedRatioComponent implements OnInit {
  private _size = 200;

  @Input() total: number;
  @Input() survived: number;

  private _colors = [RedColor, LightGreenColor];

  constructor(private elementRef: ElementRef, private pieChart: PieChartService) {
  }

  ngOnInit() {
    const host = this.elementRef.nativeElement.querySelector('.account-survived-ratio-chart-container svg');
    if (host) {
      const data: PieChartData[] = [
        new PieChartData('R.I.P', this.total - this.survived),
        new PieChartData('Survived', this.survived),
      ];

      const options: IPieChartOptions = {
        width: this._size,
        height: this._size,
        colors: this._colors,
        innerRadius: 35
      };
      this.pieChart.create(host, options, data);
    }
  }
}
