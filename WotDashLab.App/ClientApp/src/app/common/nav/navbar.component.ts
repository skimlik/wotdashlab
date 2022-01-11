import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { WotAccountSearchService } from '../../accounts/search/wot-account-search.service';
import { ISearchServiceInterface } from '../search-box/search-service-interface';
import { ISearchResultItem } from '../search-box/search-result-item';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { SearchBoxComponent } from '../search-box/search-box.component';
import { SupportedRegions } from "../constants/string-constraints";
import { IAuthInfo } from "../../core/infrastructure/authentication/auth-info";
import { NavItem } from "./nav-item";
import { AuthenticationService } from "../../core/infrastructure/authentication/authentication.service";

@Component({
  selector: 'app-navbar',
  templateUrl: 'navbar.component.html',
  styleUrls: ['navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent implements OnDestroy, OnInit {
  private _currentUser: IAuthInfo;

  @ViewChild(SearchBoxComponent, { static: false }) searchBox: SearchBoxComponent;
  @Output() onLoadProfileRequested = new EventEmitter<{ accountId: number, region: string }>();
  @Input() brand = 'World of Tanks';
  @Input() currentApiName = 'Wot';
  @Input()
  set currentUser(value: IAuthInfo) {
    this._currentUser = value;
    this.initializeNavBarItems();
  }
  get currentUser(): IAuthInfo {
    return this._currentUser;
  }

  accountSearch: ISearchServiceInterface;
  navBarItems: NavItem[];
  private _searchRecordsLimit = 10;
  private _disposed$ = new Subject<void>();

  constructor(
    private searchService: WotAccountSearchService,
    private authService: AuthenticationService,
    private router: Router) {
    this.accountSearch = {
      resolve: (text) => searchService.searchAll({
        match: text.indexOf(',') > -1 ? 'exact' : 'startswith',
        text,
        limit: this._searchRecordsLimit,
        region: this.region,
      }).pipe(
        map(data => data.map(item => <ISearchResultItem>{
          id: item.account_id,
          name: item.nickname,
        })),
        takeUntil(this._disposed$)
      )
    };
  }

  private _region: SupportedRegions = 'ru';

  get region(): SupportedRegions {
    return this._region;
  }

  @Input()
  set region(value: SupportedRegions) {
    if (this.searchBox) {
      this.searchBox.clear();
    }
    this._region = value;
  }

  ngOnInit(): void {
    this.navBarItems = this.initializeNavBarItems();
  }

  ngOnDestroy(): void {
    this._disposed$.next();
    this._disposed$.complete();
  }

  showAllSearchResults(e: { searchText: string }): void {
    this.router.navigate(['accounts'], {
      queryParams: { search: e.searchText }
    });
  }

  goToAccountProfile(e: ISearchResultItem) {
    this.onLoadProfileRequested.next({ accountId: e.id, region: this.region });
    this.router.navigate(['accounts', e.id]);
  }

  private get accountId(): string {
    return this.currentUser?.accountId.toString();
  }

  private initializeNavBarItems(): NavItem[] {
    console.log(this.accountId);
    return [{
      name: 'Home',
      url: '/',
      iconClass: 'fa fa-home',
    }, {
      name: 'Search',
      url: '/accounts',
      iconClass: 'fa fa-search',
    }, {
      name: 'Servers',
      url: '/wgn/servers',
      iconClass: 'fa fa-server'
    }, {
      name: 'Profile',
      getUrl: () => `/accounts/${this.accountId}`,
      iconClass: 'fa fa-user',
      hide: () => !this.authService.isLoggedIn()
    }];
  }
}
