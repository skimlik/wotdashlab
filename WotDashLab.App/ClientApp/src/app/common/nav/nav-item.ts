import { RouterLinkActive } from "@angular/router";

export interface NavItem {
  name: string;
  iconClass: string;
  url?: string;
  getUrl?: () => string;
  active?: boolean;
  hide?: () => boolean;
  command?: () => void;
}
