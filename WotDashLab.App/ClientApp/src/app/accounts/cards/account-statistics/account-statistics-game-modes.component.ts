import { Component, Input } from '@angular/core';
import { IAccountProfileState } from '../../store/profile/account-profile.state';

@Component({
  selector: 'app-account-statistics-game-modes',
  templateUrl: './account-statistics-game-modes.component.html',
  styleUrls: ['./account-statistics-game-modes.component.scss']
})
export class AccountStatisticsGameModesComponent {
  @Input() profile: IAccountProfileState;
}
