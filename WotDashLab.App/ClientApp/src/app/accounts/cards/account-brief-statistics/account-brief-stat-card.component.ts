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

  get damageReceived(): number {
    return this.profile?.statistics?.all?.damageReceived || 0;
  }

  get damageDealt(): number {
    return this.profile?.statistics?.all?.damageDealt || 0;
  }

  get damageRatio(): number {
    if (this.damageReceived) {
      return this.damageDealt / this.damageReceived
    }
    return 0;
  }

  get survived(): number {
    return this.profile?.statistics?.all.survivedBattles || 0;
  }

  get survivedRatio(): number {
    if (this.battles) {
      return this.survived / this.battles;
    }
    return 0;
  }

  get winRate(): number {
    if (this.battles) {
      return this.wins / this.battles;
    }
    return 0;
  }
}
