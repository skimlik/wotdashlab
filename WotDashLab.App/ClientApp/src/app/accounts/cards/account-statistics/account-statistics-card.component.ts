import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { IAccountProfileState } from '../../store/profile/account-profile.state';
import { StatisticsService, StatisticsServiceFactory } from '../statistics/statistics.service';

@Component({
  selector: 'app-account-statistics-card',
  templateUrl: 'account-statistics-card-component.html',
  styleUrls: ['account-statistics-card-component.scss', 'account-statistics-grid.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class AccountStatisticsCardComponent {
  private _statistics: StatisticsService;
  private _profile: IAccountProfileState;

  @Input()
  set profile(value: IAccountProfileState) {
    this._statistics = this.statisticsServiceFactory.create(value?.statistics.all);
    this._profile = value;
  }
  get profile(): IAccountProfileState {
    return this._profile;
  }

  constructor(private statisticsServiceFactory: StatisticsServiceFactory) {
  }

  get statistics(): StatisticsService {
    return this._statistics;
  }
}
