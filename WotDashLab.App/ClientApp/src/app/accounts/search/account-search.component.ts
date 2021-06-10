import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, takeUntil } from 'rxjs/operators';
import { BehaviorSubject, of, Subject } from 'rxjs';
import { ColDef, ColumnApi, GridApi, GridReadyEvent } from 'ag-grid-community';
import { CollectionUtils } from '../../core/services/collection.utils';
import { IWgnAccountSearchResult, IWotAccount } from '../account';
import { GetAccountGridCellRenderers } from './account-grid-actions-cell.renderers';
import { WgnAccountSearchService } from "./wgn-account-search.service";
import { IApplicationSettingsState } from "../../core/store/core.state";
import { Store } from "@ngrx/store";
import { DatePipe } from "@angular/common";
import { UnixDatePipe } from "../../common/unix-date.pipe";

@Component({
  selector: 'account-search',
  templateUrl: 'account-search.component.html',
  styleUrls: ['account-search.component.scss'],
})
export class AccountSearchComponent implements OnInit, OnDestroy {
  private _disposed$ = new Subject<void>();
  private _gridApi: GridApi;
  private _gridColumnApi: ColumnApi;

  searchText = '';
  rowData$ = new BehaviorSubject<IWgnAccountSearchResult[]>([]);
  context: { componentParent: AccountSearchComponent };
  components = {
    actionsCellRenderer: GetAccountGridCellRenderers(),
  }

  gridColumns: ColDef[] = [
    {
      colId: 'account_id',
      field: 'account_id',
      headerName: 'Account #',
      width: 120,
      minWidth: 80,
    },
    {
      colId: 'nickname',
      field: 'nickname',
      headerName: 'Nickname',
      sort: 'asc',
      comparator: CollectionUtils.caseInsensitiveStringCompare,
      minWidth: 180,
    },
    {
      colId: 'created_at',
      field: 'created_at',
      headerName: 'Created At',
      valueFormatter: (params) => (this.datePipe.transform(this.unixDate.transform(params.value)))
    },
    {
      colId: 'viewAction',
      headerName: '',
      width: 80,
      suppressAutoSize: true,
      sortable: false,
      cellRenderer: 'actionsCellRenderer',
      cellClass: 'link-primary',
    },
    {
      colId: 'games',
      field: 'games',
      headerName: 'Games',
      minWidth: 100,
      tooltipValueGetter: (params) => AccountSearchComponent.resolveGameName(params.value),
      valueFormatter: (params) => AccountSearchComponent.resolveGameName(params.value)
    }
  ];

  defaultColDef: ColDef = {
    flex: 1,
    minWidth: 100,
    sortable: true,
    resizable: true,
    sortingOrder: ['asc', 'desc']
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private searchService: WgnAccountSearchService,
    private datePipe: DatePipe,
    private unixDate: UnixDatePipe,
  ) {
    this.context = { componentParent: this };
  }

  ngOnInit(): void {
    this.route.queryParamMap
      .pipe(
        map((q) => q.get('search')),
        takeUntil(this._disposed$)
      )
      .subscribe((text) => (this.searchText = text));
  }

  onGridReady(params: GridReadyEvent): void {
    this._gridApi = params.api;
    this._gridColumnApi = params.columnApi;
  }

  ngOnDestroy(): void {
    this._disposed$.next();
    this._disposed$.complete();
    this.rowData$.complete();
  }

  search() {
    const search$ = this.searchText
      ? this.searchService.searchAll({
        search: this.searchText,
        type: this.searchText.indexOf(',') > -1 ? 'exact' : 'startswith'
      })
      : of([]);

    search$.pipe(
      takeUntil(this._disposed$)
    ).subscribe(data => this.rowData$.next(data));
  }

  openProfile(accountId: number): void {
    this.router.navigate(['accounts', accountId]);
  }

  private static resolveGameName(value: string[]) {
    const values = value?.map(p => {
      switch (p) {
        case 'wot':
          return 'World of Tanks';
        case 'wotb':
          return 'World of Tanks Blitz';
        case 'wowp':
          return 'World of Warplanes';
        case 'wows':
          return 'World of Warpships';
        case 'wgcb':
          return 'Console';
        case 'wgn':
          return 'WARGAMING.NET';
        default:
          return p;
      }
    })
    return values?.join(', ')
  }
}
