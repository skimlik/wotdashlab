import { Observable } from 'rxjs';
import { ISearchResultItem } from './search-result-item';

export interface ISearchServiceInterface {
  resolve: (text: string) => Observable<ISearchResultItem[]>;
}
