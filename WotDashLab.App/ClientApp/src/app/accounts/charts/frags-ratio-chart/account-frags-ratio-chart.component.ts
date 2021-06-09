import { ChangeDetectionStrategy, Component, ElementRef, Input, OnInit } from '@angular/core';
import { PieChartService } from "../../../common/charts/pie/pie-chart.service";
import { PieChartData } from "../../../common/charts/pie/pie-chart-data";
import { IPieChartOptions } from "../../../common/charts/pie/pie-chart-options";
import { LightGreenColor, RedColor } from "../../../common/constants/color-palette";

@Component({
  selector: 'app-account-frags-ratio-chart',
  templateUrl: 'account-frags-ratio-chart.component.html',
  styleUrls: ['../common-chart-styles.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AccountFragsRatioChartComponent implements OnInit {
  private _size = 180;
  private _innerRadius = 15;

  @Input() battles: number;
  @Input() survived: number;
  @Input() frags: number;

  constructor(private elementRef: ElementRef, private pieChart: PieChartService) {
  }

  ngOnInit() {
    const host = this.elementRef.nativeElement.querySelector('.parent-container svg');
    if (host) {
      const data: PieChartData[] = [
        new PieChartData('Frags', this.frags),
        new PieChartData('Fraged', this.wasFraged),
      ];

      const options: IPieChartOptions = {
        width: this.size,
        height: this.size,
        colors: [LightGreenColor, RedColor],
        innerRadius: this._innerRadius,
        classes: ['green', 'red']
      }

      this.pieChart.create(host, options, data);
    }
  }

  get wasFraged(): number {
    return this.battles - this.survived;
  }

  get ratio(): number {
    return !this.wasFraged ? 0 : this.frags / (this.frags + this.wasFraged);
  }

  get size(): number {
    return this._size;
  }
}
