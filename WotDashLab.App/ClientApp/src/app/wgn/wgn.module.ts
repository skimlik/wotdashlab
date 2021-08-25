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
import { YoutubeFeedEffects } from "./videos/store/youtube-feed.effects";
import { YoutubeFeedComponent } from "./videos/youtube-feed.component";
import { AppCommonModule } from "../common/app-common.module";

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
      {
        path: 'videos',
        component: YoutubeFeedComponent,
        pathMatch: 'full'
      }
    ],
  },
];

@NgModule({
  imports: [
    CommonModule,
    CoreModule.forRoot(),
    RouterModule.forChild(routes),
    StoreModule.forFeature(featureName, wgnReducers),
    EffectsModule.forFeature([ServersInfoEffects, YoutubeFeedEffects]),
    AppCommonModule
  ],
  exports: [],
  declarations: [WgnContainerComponent, ServersComponent, YoutubeFeedComponent],
  providers: [],
})
export class WgnContainerModule {}
