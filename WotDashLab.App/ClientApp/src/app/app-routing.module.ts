import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from "./home-page.component";

const routes: Routes = [{
    path: '',
    component: HomePageComponent,
    pathMatch: 'full'
  },  {
    path: 'achievements',
    loadChildren: () => import('./achievements/achievements.module').then(m => m.AchievementsModule),
  }, {
    path: 'accounts',
    loadChildren: () => import('./accounts/accounts.module').then(m => m.AccountsModule),
  }, {
    path: 'wgn',
    loadChildren: () => import('./wgn/wgn.module').then(m => m.WgnContainerModule),
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
