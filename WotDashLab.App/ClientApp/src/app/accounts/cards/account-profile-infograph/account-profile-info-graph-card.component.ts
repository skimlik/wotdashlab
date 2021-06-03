import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IAccountProfileState } from "../../store/profile/account-profile.state";

@Component({
  selector: 'app-account-profile-info-graph-card',
  templateUrl: 'account-profile-info-graph-card.component.html',
  styleUrls: ['account-profile-info-graph-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class AccountProfileInfoGraphCardComponent {
  @Input() profile: IAccountProfileState;
}
