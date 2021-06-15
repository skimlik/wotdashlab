import { NgModule } from '@angular/core';

import { WgnContainerComponent } from './wgn-container.component';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { ServersComponent } from './servers/servers.component';
import { CoreModule } from '../core/core.module';
import { StoreModule } from "@ngrx/store";
import { featureName } from "./store";
import { wgnReducers } from "./store/wgn.state";
import { EffectsModule } from "@ngrx/effects";
import { ServersInfoEffects } from "./servers/store/servers.effects";

const routes: Route[] = [
  {
    path: '',
    component: WgnContainerComponent,
    children: [
      {
        path: 'servers',
        component: ServersComponent,
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [
    CommonModule,
    CoreModule.forRoot(),
    RouterModule.forChild(routes),
    StoreModule.forFeature(featureName, wgnReducers),
    EffectsModule.forFeature([ServersInfoEffects])
  ],
  exports: [],
  declarations: [WgnContainerComponent, ServersComponent],
  providers: [],
})
export class WgnContainerModule {}
