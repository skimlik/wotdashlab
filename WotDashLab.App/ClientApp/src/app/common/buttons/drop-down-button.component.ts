import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  TemplateRef
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
export class DropDownButtonComponent implements OnInit, OnDestroy {
  @Input() text: string;
  @Input() selectedItem: DropDownItem;
  @Input() dropDownItems: DropDownItem[] = [];
  @Input() addonWidth: number = NaN;
  @Input() dropDownOnly = false;
  @Input() addonTemplateRef: TemplateRef<any>;
  @Output() itemSelected = new EventEmitter<DropDownItem>();
  @Output() clicked = new EventEmitter<void>();
  private _host: HTMLDivElement;
  private _dispose$ = new Subject<void>();

  constructor(private elementRef: ElementRef, private domEvents: DomEvents) {
  }

  get selectedItemText(): string {
    return this.selectedItem?.name || '';
  }

  isActiveItem(item: DropDownItem): boolean {
    return item?.id === this.selectedItem?.id;
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
      if (!item.noSelect) {
        this.selectedItem = item;
        this.itemSelected.emit(item);
      }
      if (item.command) {
        item.command();
      }
      this.close();
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
