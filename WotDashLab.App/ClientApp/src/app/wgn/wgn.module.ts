import { NgModule } from '@angular/core';

import { WgnContainerComponent } from './wgn-container.component';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { ServersComponent } from './servers/servers.component';
import { CoreModule } from '../core/core.module';

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
  imports: [CommonModule, CoreModule.forRoot(), RouterModule.forChild(routes)],
  exports: [],
  declarations: [WgnContainerComponent, ServersComponent],
  providers: [],
})
export class WgnContainerModule {}
