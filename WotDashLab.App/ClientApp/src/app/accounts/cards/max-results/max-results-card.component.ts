import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {IAccountProfileState, ITankShortInfo} from "../../store/profile/account-profile.state";

@Component({
  selector: 'app-max-results-card',
  templateUrl: 'max-results-card.component.html',
  styleUrls: ['max-results-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class MaxResultsCardComponent {
  @Input() profile: IAccountProfileState;

  get maxFragsTank(): ITankShortInfo {
    return this.getTankInfo(this.profile.statistics?.all?.maxFragsTankId);
  }

  get maxDamageTank(): ITankShortInfo {
    return this.getTankInfo(this.profile.statistics?.all?.maxDamageTankId);
  }

  get maxXpTank(): ITankShortInfo {
    return this.getTankInfo(this.profile.statistics?.all?.maxXpTankId);
  }

  private getTankInfo(tankId: number): ITankShortInfo {
    if (tankId) {
      return this.profile.tankInfos[tankId];
    }
    return undefined;
  }
}
