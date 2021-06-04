import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IAccountProfileState } from "./store/profile/account-profile.state";

@Component({
  selector: 'app-account-attributes',
  templateUrl: 'account-attributes.component.html',
  styleUrls: ['account-attributes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AccountAttributesComponent {
  @Input() profile: IAccountProfileState;

  get isPremium(): boolean {
    if (!this.profile.private) {
      return false;
    }

    return this.profile.private.premiumExpiresAt > new Date().valueOf() / 1000;
  }
}
