import { NgModule } from '@angular/core';
import { AccountsComponent } from './accounts.component';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AccountSearchComponent } from './search/account-search.component';
import { FormsModule } from '@angular/forms';
import { AccountProfileComponent } from './profile/account-profile.component';
import { StoreModule } from '@ngrx/store';
import { featureName } from './store';
import { reducers } from './store/accounts-state';
import { EffectsModule } from '@ngrx/effects';
import { AccountProfileEffects } from './store/profile/account-profile.effects';
import { AccountProfileService } from './store/profile/account-profile.service';
import { AppCommonModule } from '../common/app-common.module';
import { AccountInfoCardComponent } from './cards/account-info/account-info-card.component';
import { AccountBriefStatisticsCardComponent } from './cards/account-brief-statistics/account-brief-stat-card.component';
import { MaxResultsCardComponent } from './cards/max-results/max-results-card.component';
import { AccountProfileInfoGraphCardComponent } from './cards/account-profile-infograph/account-profile-info-graph-card.component';
import { PieChartService } from '../common/charts/pie/pie-chart.service';
import { AccountWinRateChartComponent } from './charts/account-winrate-chart/account-win-rate-chart.component';
import { AccountSurvivedRatioComponent } from './charts/account-survived-ratio-chart/account-survived-ratio-chart.component';
import { AccountDamageRatioChartComponent } from './charts/account-damage-ratio-chart/account-damage-ratio-chart.component';
import { AccountFragsRatioChartComponent } from './charts/frags-ratio-chart/account-frags-ratio-chart.component';
import { AccountAttributesComponent } from './account-attributes.component';
import { UnixDatePipe } from '../common/unix-date.pipe';
import { AccountStatisticsCardComponent } from './cards/account-statistics/account-statistics-card.component';
import { AccountSearchEffects } from './store/search/account-search.effects';
import { AccountStatisticsGameModesComponent } from './cards/account-statistics/account-statistics-game-modes.component';
import { AccountProfilePageComponent } from './profile/account-profile-page.component';
import { AccountFragsComponent } from './profile/account-frags.component';

const routes: Routes = [
  {
    path: '',
    component: AccountsComponent,
    children: [
      {
        path: '',
        component: AccountSearchComponent,
        pathMatch: 'full',
      },
      {
        path: ':accountId',
        component: AccountProfilePageComponent,
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature(featureName, reducers),
    EffectsModule.forFeature([AccountProfileEffects, AccountSearchEffects]),
    FormsModule,
    AppCommonModule,
  ],
  exports: [],
  declarations: [
    AccountProfilePageComponent,
    AccountAttributesComponent,
    AccountsComponent,
    AccountSearchComponent,
    AccountProfileComponent,
    AccountInfoCardComponent,
    AccountBriefStatisticsCardComponent,
    MaxResultsCardComponent,
    AccountStatisticsCardComponent,
    AccountStatisticsGameModesComponent,
    AccountProfileInfoGraphCardComponent,
    AccountWinRateChartComponent,
    AccountSurvivedRatioComponent,
    AccountDamageRatioChartComponent,
    AccountFragsRatioChartComponent,
    AccountFragsComponent,
  ],
  providers: [
    AccountProfileService,
    PieChartService,
    DatePipe,
    UnixDatePipe,
  ],
})
export class AccountsModule {
}
