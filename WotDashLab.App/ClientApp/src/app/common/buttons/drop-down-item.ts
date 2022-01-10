export interface DropDownItem {
  id: number | string;
  name: string;
  noSelect?: boolean;
  command?: () => void;
}
