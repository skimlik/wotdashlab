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
import { DropDownItem } from "./drop-down-item";
import { DomEvents } from "../../core/services/dom-events.service";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

@Component({
  selector: 'app-drop-down-button',
  templateUrl: 'drop-down-button.component.html',
  styleUrls: ['drop-down-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class DropDownButtonComponent implements OnInit, OnDestroy{
  private _host: HTMLDivElement;
  private _dispose$ = new Subject<void>();

  @Input() text: string;
  @Input() selectedItem: DropDownItem;
  @Input() dropDownItems: DropDownItem[] = [];
  @Input() addonWidth: number = NaN;
  @Input() dropDownOnly = false;

  @Output() itemSelected = new EventEmitter<DropDownItem>();
  @Output() clicked = new EventEmitter<void>();

  constructor(private elementRef: ElementRef, private domEvents: DomEvents) {
  }

  ngOnInit(): void {
    this._host = this.elementRef.nativeElement.querySelector('.drop-down-button-container');
    this.domEvents.onElementOuterClick(this._host).pipe(takeUntil(this._dispose$)).subscribe(() => {
      this.close();
    });

  }

  ngOnDestroy(): void {
    this._dispose$.next();
    this._dispose$.complete();
  }

  onAddonClick(): void {
    if (this._host) {
      this._host.classList.toggle('drop-down-open')
    }
  }

  onSelect(item: DropDownItem): void {
    if (item) {
      this.selectedItem = item;
      this.close();
      this.itemSelected.emit(item);
    }
  }

  onClick(): void {
    this.clicked.emit();
    this.close();
  }

  close(): void {
    this._host.classList.remove('drop-down-open');
  }
}
