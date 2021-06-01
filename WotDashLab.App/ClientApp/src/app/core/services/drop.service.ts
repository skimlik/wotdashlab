import { Observable, Subject } from 'rxjs';
import { Injectable, NgZone } from '@angular/core';
import { DomEvents } from './dom-events.service';
import { takeUntil } from 'rxjs/operators';

import Popper, { PopperOptions } from 'popper.js';

export interface IDropOptions {
  openDelay?: number;
  attachment: HTMLElement;
  popperOptions: PopperOptions;
}

export class Drop {
  private _suppressClose: boolean;
  private _onClosed$ = new Subject<any>();
  private _onOpened$ = new Subject<any>();
  private readonly _disposed$: Subject<boolean>;

  private popper: Popper;
  private options: IDropOptions;
  private attachment: HTMLElement;

  public onClosed$: Observable<any>;
  public onOpened$: Observable<any>;
  public isOpen: boolean;

  constructor(
    element: HTMLElement,
    options: IDropOptions,
    private domEvents: DomEvents,
    private autoClose: boolean,
    private zone: NgZone
  ) {
    this._disposed$ = new Subject<boolean>();
    this.onClosed$ = this._onClosed$
      .asObservable()
      .pipe(takeUntil(this._disposed$));
    this.onOpened$ = this._onOpened$
      .asObservable()
      .pipe(takeUntil(this._disposed$));

    this.options = options;
    this.attachment = options.attachment;
    this.create(element);
  }

  private create(element: HTMLElement): void {
    this.zone.runOutsideAngular(() => {
      this.popper = new Popper(
        element,
        this.options.attachment,
        this.options.popperOptions
      );
      this.popper.disableEventListeners();
      this.popper.scheduleUpdate();
    });
    this.hide();
  }

  public position(): void {
    this.zone.runOutsideAngular(() => {
      this.popper.scheduleUpdate();
    });
  }

  public open(): void {
    if (this.isOpen || !this.popper) {
      return;
    }

    if (this.autoClose) {
      this._suppressClose = true;
      this.watchOuterClicks();
    }

    this.attachment.style.visibility = 'visible';

    setTimeout(() => {
      this.position();
      this.attachment.style.opacity = '1';
      this._onOpened$.next('open');
      this.isOpen = true;
    }, this.options.openDelay);
  }

  public close(): void {
    if (this.isOpen) {
      this.hide();
      this._onClosed$.next('close');
    }
  }

  private hide(): void {
    this.attachment.style.visibility = 'hidden';
    this.attachment.style.opacity = '0';
    this.isOpen = false;
  }

  public destroy(): void {
    this._disposed$.next(true);
    this._disposed$.complete();
    this.zone.runOutsideAngular(() => {
      if (this.popper) {
        this.popper.destroy();
      }
      this.popper = null;
    });
  }

  public watchOuterClicks(): void {
    const outerClick$ = this.domEvents
      .onElementOuterClick(this.attachment)
      .subscribe(
        () => {
          if (!this._suppressClose) {
            this.close();
            outerClick$.unsubscribe();
          }
          this._suppressClose = false;
        },
        (err) => {
          console.error(err);
          outerClick$.unsubscribe();
        }
      );
  }
}

@Injectable()
export class DropFactoryService {
  constructor(private domEvents: DomEvents, private zone: NgZone) {}

  public createDrop(
    target: HTMLElement,
    dropOptions: IDropOptions,
    autoClose = true
  ): Drop {
    const drop = new Drop(
      target,
      dropOptions,
      this.domEvents,
      autoClose,
      this.zone
    );
    return drop;
  }
}
