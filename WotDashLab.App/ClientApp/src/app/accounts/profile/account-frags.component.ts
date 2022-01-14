import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {SupportedLanguages, SupportedRegions} from 'src/app/common/constants/string-constraints';
import {TanksService} from 'src/app/core-api/tanks/tanks.service';
import {IFragInfo} from '../store/accounts-state';
import {IAccountProfileState} from '../store/profile/account-profile.state';

@Component({
  selector: 'app-account-frags',
  templateUrl: './account-frags.component.html',
  styleUrls: ['./account-frags.component.scss'],
})
export class AccountFragsComponent implements OnInit {
  private _profile: IAccountProfileState;
  private _tankIds: number[] = [];
  tanks$: Observable<IFragInfo[]>;

  @Input() region: SupportedRegions = 'ru';
  @Input() language: SupportedLanguages = 'ru';
  @Input()
  set profile(value: IAccountProfileState) {
    if (value) {
      this._profile = value;
      if (value.statistics?.frags) {
        this._tankIds = Object.keys(value.statistics.frags).map((k) => +k);
      }
    }
  }
  get profile(): IAccountProfileState {
    return this._profile;
  }

  constructor(private tanksService: TanksService) {}

  ngOnInit(): void {
    this.processTankIds();
  }

  private processTankIds(): void {
    //todo: implement query logic
  }

  private tanksSort(data: IFragInfo[]): IFragInfo[] {
    return data.sort((d1, d2) => {
      if (d1.count === d2.count) {
        return 0;
      }
      return d1.count > d2.count ? -1 : 1;
    });
  }
}
