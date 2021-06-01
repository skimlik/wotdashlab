import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {IAccountProfileState} from "../../store/profile/account-profile.state";

@Component({
  selector: 'app-account-brief-stat-card',
  templateUrl: 'account-brief-stat-card.component.html',
  styleUrls: ['account-brief-stat-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AccountBriefStatisticsCardComponent {
  @Input() profile: IAccountProfileState;
}
