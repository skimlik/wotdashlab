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

  get wins(): number {
    return this.profile?.statistics?.all?.wins || 0;
  }

  get losses(): number {
    return this.profile?.statistics?.all?.losses || 0;
  }

  get battles(): number {
    return this.profile?.statistics?.all?.battles || 0;
  }

  get winRate(): number {
    if (this.wins) {
      return this.losses / this.battles;
    }
    return 0;
  }
}
