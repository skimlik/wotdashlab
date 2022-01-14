import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IAccountProfileState } from '../store/profile/account-profile.state';

@Component({
  selector: 'app-account-profile',
  templateUrl: 'account-profile.component.html',
  styleUrls: ['account-profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountProfileComponent {
  @Input() profile: IAccountProfileState;
}
