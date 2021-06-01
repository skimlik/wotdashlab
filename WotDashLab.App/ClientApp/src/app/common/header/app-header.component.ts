import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter } from '@angular/core';
import { AuthenticationService } from 'src/app/core/infrastructure/authentication/authentication.service';
import { DefaultRegion } from '../../core/constants/default-settings';
import { IAuthInfo } from '../../core/infrastructure/authentication/auth-info';

@Component({
  selector: 'app-header',
  templateUrl: 'app-header.component.html',
  styleUrls: ['app-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class AppHeaderComponent {
  @Input() currentApiName = 'World of Tanks';
  @Input() currentUser: IAuthInfo;
  @Input() brand = 'WoT Dashboard';
  @Input() currentRegion = DefaultRegion;
  @Input() availableRegions: string[] = [];
  @Output() onRegionChange = new EventEmitter<string>();
  @Output() onRequestUserProfile = new EventEmitter<void>();
  @Output() onLogoffRequested = new EventEmitter<void>();

  constructor(private authenticationService: AuthenticationService) { }

  login(): void {
    this.authenticationService.login(this.currentRegion);
  }

  get isLoggedIn(): boolean {
    return !!this.currentUser;
  }

  getRegionName(r: string): string {
    switch (r.toLowerCase()) {
      case 'ru':
        return 'Russia';
      case 'na':
        return 'USA';
      case 'eu':
        return 'Europe';
      case 'asia':
        return 'Asia';
    }
  }

  requestRegion(ix: number) {
    if (this.availableRegions.length > ix && ix > -1) {
      this.onRegionChange.next(this.availableRegions[ix]);
    }
  }
}
