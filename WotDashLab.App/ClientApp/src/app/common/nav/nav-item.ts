import { RouterLinkActive } from "@angular/router";

export interface NavItem {
  name: string;
  iconClass: string;
  url?: string;
  routerLinkActiveOptions?: {
    exact: boolean;
  } | {
    matrixParams: 'exact' | 'subset' | 'ignored'
    queryParams: 'exact' | 'subset' | 'ignored'
    paths: 'exact' | 'subset'
    fragment: 'exact' | 'ignored'
  };
  hide?: () => boolean;
  command?: () => void;
}
