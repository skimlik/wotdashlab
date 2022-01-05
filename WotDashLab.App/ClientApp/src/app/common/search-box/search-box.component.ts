import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {BehaviorSubject, EMPTY, merge, Observable, Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged, filter, map, mergeMap, takeUntil, tap} from 'rxjs/operators';
import {ISearchServiceInterface} from './search-service-interface';
import {Drop, DropFactoryService, IDropOptions} from '../../core/services/drop.service';
import Popper from 'popper.js';
import {ISearchResultItem} from './search-result-item';
import Placement = Popper.Placement;

@Component({
  selector: 'app-search-box',
  templateUrl: 'search-box.component.html',
  styleUrls: ['search-box.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchBoxComponent implements OnInit, OnDestroy {
  @Output() onItemSelected = new EventEmitter<ISearchResultItem>();
  @Output() onShowAllResults = new EventEmitter<{searchText: string}>();

  @Input() dataSource: ISearchServiceInterface;
  @Input() placeholder = 'Search';
  @Input() inputDelay = 300;
  @Input() minSearchTextLength = 3;
  @Input() dropDirection: Placement = 'bottom-start';
  @Input() openDelay: number;
  @Input() maxWidth: number;
  @Input() dropDownWidth: number;

  text$: Observable<string>;
  textIsTooShort$: Observable<boolean>;
  searching$: Observable<boolean>;
  items: ISearchResultItem[] = [];
  activeItemIndex = -1;
  opened$: Observable<boolean> = EMPTY;

  private _disposed$ = new Subject<void>();
  private _drop: Drop;
  private _text$ = new BehaviorSubject<string>('');
  private _searching$ = new BehaviorSubject<boolean>(false);

  constructor(private host: ElementRef, private dropFactory: DropFactoryService) {
    this.text$ = this._text$.asObservable().pipe(distinctUntilChanged(), takeUntil(this._disposed$));

    this.searching$ = this._searching$.asObservable().pipe(takeUntil(this._disposed$));

    const search$ = this.text$.pipe(
      map((text) => text.trim()),
      filter((text) => text && text.length >= this.minSearchTextLength),
      takeUntil(this._disposed$)
    );

    const items$ = search$.pipe(
      distinctUntilChanged(),
      tap(() => this._searching$.next(true)),
      debounceTime(this.inputDelay),
      mergeMap((text) => this.dataSource.resolve(text).pipe(tap(() => this._searching$.next(false)))),
      takeUntil(this._disposed$)
    );

    items$.subscribe((items) => {
      this.activeItemIndex = -1;
      this.items = items;
    });

    search$.subscribe(() => this.open());
  }

  ngOnInit(): void {
    this.textIsTooShort$ = this.text$.pipe(
      map((text) => !!text && text.length > 0 && text.length < this.minSearchTextLength)
    );

    const attachment = this.host.nativeElement.querySelector('.drop-down-area');
    const target = this.host.nativeElement.querySelector('.search-input');
    const dropDownOptions = this.getDropOptions(attachment);
    this._drop = this.dropFactory.createDrop(target, dropDownOptions, true);
    this.opened$ = merge([
      this._drop.onOpened$.pipe(map(() => true)),
      this._drop.onClosed$.pipe(map(() => false)),
    ]).pipe(
      mergeMap((data) => {
        return data;
      })
    );
  }

  ngOnDestroy(): void {
    this._disposed$.next();
    this._disposed$.complete();
    this._drop.destroy();
  }

  open(): void {
    if (!this._drop.isOpen) {
      this._drop.open();
    }
  }

  close(): void {
    this.activeItemIndex = -1;
    this._drop.close();
  }

  modelChange(text: string): void {
    this._text$.next(text);
  }

  private getDropOptions(attachment: HTMLElement): IDropOptions {
    return {
      attachment: attachment,
      openDelay: this.openDelay,
      popperOptions: {
        placement: this.dropDirection,
        removeOnDestroy: true,
        modifiers: {
          preventOverflow: {escapeWithReference: true},
          flip: {
            boundariesElement: 'window',
            behavior: 'flip',
            enabled: true,
            padding: 1,
          },
        },
      },
    };
  }

  itemSelected(item: ISearchResultItem): void {
    if (item) {
      this.onItemSelected.next(item);
      this.close();
      this.clear();
    }
  }

  resize(_: Event): void {
    if (this._drop.isOpen) {
      this.close();
    }
  }

  showAllResults(searchText: string): void {
    this.onShowAllResults.next({searchText});
    this.close();
    this.clear();
  }

  clear(): void {
    this._text$.next('');
  }

  onKeyDown(keyDown: KeyboardEvent): void {
    if (this._drop.isOpen) {
      switch (keyDown.code) {
        case 'ArrowDown':
          this.activeItemIndex = this.activeItemIndex >= this.items.length - 1 ? 0 : this.activeItemIndex + 1;
          break;
        case 'ArrowUp':
          this.activeItemIndex = this.activeItemIndex < 1 ? this.items.length - 1 : this.activeItemIndex - 1;
          break;
        case 'Enter':
          if (this.activeItemIndex > -1 && this.activeItemIndex < this.items.length) {
            this.itemSelected(this.items[this.activeItemIndex]);
          }
          break;
      }
    }
  }
}
