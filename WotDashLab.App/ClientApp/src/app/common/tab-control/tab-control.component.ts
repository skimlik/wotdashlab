import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TabModel } from './tab.model';

@Component({
  selector: 'app-tabs',
  templateUrl: './tab-control.component.html',
  styleUrls: ['./tab-control.component.scss']
})
export class TabControlComponent implements OnInit {
  @Input() activeTab: TabModel;
  @Input() tabs: TabModel[] = [];

  @Output() selected = new EventEmitter<TabModel>();

  constructor() { }

  ngOnInit(): void { }

  onTabClick(tab): void {
    this.activeTab = tab;
    this.selected.emit(tab);
  }

  isActive(tab: TabModel): boolean {
    return this.activeTab?.key === tab.key;
  }
}
