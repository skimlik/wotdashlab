import { ChangeDetectionStrategy, Component, Input, OnDestroy, Output, EventEmitter, ViewChild } from '@angular/core';
import { WotAccountSearchService } from '../../accounts/search/wot-account-search.service';
import { ISearchServiceInterface } from '../search-box/search-service-interface';
import { ISearchResultItem } from '../search-box/search-result-item';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { SearchBoxComponent } from '../search-box/search-box.component';
import { SupportedRegions } from "../constants/string-constraints";
import { IAuthInfo } from "../../core/infrastructure/authentication/auth-info";

@Component({
  selector: 'app-navbar',
  templateUrl: 'navbar.component.html',
  styleUrls: ['navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent implements OnDestroy{
  private _searchRecordsLimit = 10;
  private _disposed = new Subject<void>();
  private _region: SupportedRegions = 'ru';

  @ViewChild(SearchBoxComponent, { static: false }) searchBox: SearchBoxComponent;

  @Output() onLoadProfileRequested = new EventEmitter<{ accountId: number, region: string }>();

  @Input() brand = 'World of Tanks';
  @Input() currentApiName = 'Wot';
  @Input() currentUser: IAuthInfo;
  @Input()
  set region(value: SupportedRegions) {
    if (this.searchBox) {
      this.searchBox.clear();
    }
    this._region = value;
  }
  get region(): SupportedRegions {
    return this._region;
  }

  accountSearch: ISearchServiceInterface;

  constructor(private searchService: WotAccountSearchService, private router: Router) {
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
        takeUntil(this._disposed)
      )
    };
  }

  ngOnDestroy(): void {
    this._disposed.next();
    this._disposed.complete();
  }

  showAllSearchResults(e: {searchText: string}): void {
    this.router.navigate(['accounts'], {
      queryParams: { search: e.searchText }
    });
  }

  goToAccountProfile(e: ISearchResultItem) {
    this.onLoadProfileRequested.next({ accountId: e.id, region: this.region });
    this.router.navigate(['accounts', e.id]);
  }
}
