import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthenticationService } from 'src/app/core/infrastructure/authentication/authentication.service';
import { DefaultRegion } from '../../core/constants/default-settings';
import { IAuthInfo } from '../../core/infrastructure/authentication/auth-info';
import { NavItem } from "../nav/nav-item";
import { SupportedRegions } from "../constants/string-constraints";
import { ActivatedRoute } from "@angular/router";
import { tap } from "rxjs/operators";
import { DropDownItem } from "../buttons/drop-down-item";

@Component({
  selector: 'app-header',
  templateUrl: 'app-header.component.html',
  styleUrls: ['app-header.component.scss'],
})

export class AppHeaderComponent implements OnInit {
  @Input() currentApiName = 'World of Tanks';
  @Input() currentUser: IAuthInfo;
  @Input() brand = 'WoT Dashboard';
  @Input() currentRegion = DefaultRegion;
  @Input() availableRegions: SupportedRegions[] = [];
  @Output() onRegionChange = new EventEmitter<SupportedRegions>();
  @Output() onRequestUserProfile = new EventEmitter<void>();
  @Output() onLogoffRequested = new EventEmitter<void>();

  navItems: NavItem[] = [];

  constructor(
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService
  ) {
  }

  get isLoggedIn(): boolean {
    return !!this.currentUser;
  }

  get availableRegionItems(): DropDownItem[] {
    return this.availableRegions.map((r) => ({
      id: r,
      name: r.toUpperCase(),
    }));
  }

  get userActions(): DropDownItem[] {
    const self = this;
    return [
      {
        id: 'logoff',
        name: 'Log off',
        noSelect: true,
        command: () => self.onLogoffRequested.next(),
      }
    ];
  }

  ngOnInit(): void {
    this.route.url.pipe(tap(segment => {
      console.log(segment);
    }));
  }

  login(): void {
    this.authenticationService.login(this.currentRegion);
  }

  getProfileAccountId(): number {
    return this.currentUser?.accountId;
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

  requestRegion(name: string): void {
    const reg = this.availableRegions.find(r => r.toUpperCase() === name.toUpperCase());
    if (reg) {
      this.onRegionChange.next(reg);
    }
  }
}
