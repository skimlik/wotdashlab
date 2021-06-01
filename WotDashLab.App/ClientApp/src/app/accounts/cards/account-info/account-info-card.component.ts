import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IAccountProfileState } from '../../store/profile/account-profile.state';

@Component({
  selector: 'app-account-info-card',
  templateUrl: 'account-info-card.component.html',
  styleUrls: ['account-info-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AccountInfoCardComponent {
  @Input() profile: IAccountProfileState;
}
