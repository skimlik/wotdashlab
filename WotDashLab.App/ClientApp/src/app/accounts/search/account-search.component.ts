import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, takeUntil } from 'rxjs/operators';
import { BehaviorSubject, of, Subject } from 'rxjs';
import { ColDef, ColumnApi, GridApi, GridReadyEvent } from 'ag-grid-community';
import { CollectionUtils } from '../../core/services/collection.utils';
import { AccountSearchService } from './account-search.service';
import { IAccount } from '../account';
import { GetAccountGridCellRenderers } from './account-grid-actions-cell.renderers';

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
  rowData$ = new BehaviorSubject<IAccount[]>([]);
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
      colId: 'viewAction',
      headerName: '',
      width: 80,
      suppressAutoSize: true,
      cellRenderer: 'actionsCellRenderer',
      cellClass: 'link-primary',
    }
  ];

  defaultColDef: ColDef = {
    flex: 1,
    minWidth: 100,
    sortable: true,
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private searchService: AccountSearchService
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
        region: 'ru',
        text: this.searchText,
        match: this.searchText.indexOf(',') > -1 ? 'exact' : 'startswith',
        limit: 0,
      })
      : of([]);

    search$.pipe(
      takeUntil(this._disposed$)
    ).subscribe(data => this.rowData$.next(data));
  }

  openProfile(accountId: number): void {
    this.router.navigate(['accounts', accountId]);
  }
}
