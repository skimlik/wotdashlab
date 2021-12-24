import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/core/infrastructure/authentication/authentication.service';
import { DefaultRegion } from '../../core/constants/default-settings';
import { IAuthInfo } from '../../core/infrastructure/authentication/auth-info';
import { NavItem } from "../nav/nav-item";
import { SupportedRegions } from "../constants/string-constraints";
import { ActivatedRoute } from "@angular/router";
import { tap } from "rxjs/operators";

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

  ngOnInit(): void {
    this.route.url.pipe(tap(segment => {
      console.log(segment);
    }));
    this.navItems = this.getNavItems();
  }

  login(): void {
    this.authenticationService.login(this.currentRegion);
  }

  getProfileAccountId(): number {
    return this.currentUser?.accountId;
  }

  getNavItems(): NavItem[] {
    return [
      {
        name: 'Home',
        iconClass: 'fa fa-home',
        url: '/',
        routerLinkActiveOptions: { exact: true },
      },
      {
        name: 'Servers',
        iconClass: 'fa fa-server',
        url: '/wgn/servers',
        routerLinkActiveOptions: {
          paths: "exact",
          queryParams: 'subset',
          matrixParams: 'ignored',
          fragment: "ignored"
        },
      },
      {
        name: 'Search',
        iconClass: 'fa fa-search',
        url: '/accounts',
        routerLinkActiveOptions: { exact: true },
      },
      {
        name: 'Profile',
        iconClass: 'fa fa-user',
        url: `/accounts/${this.getProfileAccountId()}`,
        hide: () => !this.isLoggedIn,
        routerLinkActiveOptions: { exact: true },
      },
      {
        name: 'Sign-in',
        iconClass: 'fa fa-sign-in',
        command: () => this.login(),
        hide: () => this.isLoggedIn
      },
    ];
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
