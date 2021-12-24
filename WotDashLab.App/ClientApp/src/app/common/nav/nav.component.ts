import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NavItem } from "./nav-item";

@Component({
  selector: 'app-nav',
  templateUrl: 'nav.component.html',
  styleUrls: ['nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class NavComponent {
  @Input() items: NavItem[] = [];

  hide(item: NavItem): boolean {
    if (item) {
      return item.hide ? item.hide() : false;
    }
    return true;
  }

  onActiveChange(event: any) {
    console.log(event);
  }
}
