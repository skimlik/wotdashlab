import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import { NavItem } from "./nav-item";
import { NavigationEnd, Router } from "@angular/router";
import { filter, takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";

@Component({
  selector: 'app-nav',
  templateUrl: 'nav.component.html',
  styleUrls: ['nav.component.scss'],
})

export class NavComponent implements OnInit, OnDestroy {
  private _disposed$ = new Subject<void>();
  private _host: HTMLElement;
  private _indicator: HTMLDivElement;

  @Input() items: NavItem[] = [];

  @Output() itemClick = new EventEmitter<NavItem>();
  @Output() navigated = new EventEmitter<NavItem>();

  constructor(private elementRef: ElementRef, private router: Router) {
  }

  ngOnInit(): void {
    this._host = this.elementRef.nativeElement.querySelector('.navigation');
    this._indicator = this._host.querySelector('.indicator');

    this.router.events.pipe(
      filter((e) => e instanceof NavigationEnd),
      takeUntil(this._disposed$)
    ).subscribe((e: NavigationEnd) => {
      const queryIndex = e?.urlAfterRedirects.indexOf('?') ?? -1;
      const anchorIndex =  e?.urlAfterRedirects.indexOf('#') ?? -1;
      const length = e?.urlAfterRedirects.length ?? 0;

      const stop = (index: number) => (index > -1 ? index : length);
      const path = (e?.urlAfterRedirects.substr(0, stop(anchorIndex)) || '').substr(0, stop(queryIndex));

      const url = (i: NavItem) => (i?.url || i?.getUrl())?.toLowerCase();
      const activeItemIndex = this.items.findIndex(i => path.toLowerCase() === url(i));
      if (activeItemIndex >= 0) {
        const activeItem = this.items[activeItemIndex];
        this.updateNavBarItems(activeItem);
        this._indicator.style.transform = `translateX(${60 * activeItemIndex}px)`;
      }
    });
  }

  ngOnDestroy(): void {
    this._disposed$.next();
    this._disposed$.complete();
  }

  hide(item: NavItem): boolean {
    if (item) {
      return item.hide ? item.hide() : false;
    }
    return true;
  }

  onNavigationClick(item: NavItem, ix: number): void {
    this.itemClick.emit(item);

    if (item?.url || item?.getUrl()) {
      this._indicator.style.transform = `translateX(${60 * ix}px)`;
      this.router.navigate([item.url || item.getUrl?.()]);
      this.navigated.emit(item);
    }
  }

  private updateNavBarItems(item: NavItem): void {
    this.items = this.items.map(i => {
      const active = i.name === item?.name;
      return {
        ...i,
        active
      };
    })
  }
}
