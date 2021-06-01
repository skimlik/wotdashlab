import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { featureName } from './store';
import { coreReducers, metaReducers } from './store/core.state';
import { RouterModule } from '@angular/router';
import { ApplicationSettingsService } from './infrastructure/application-settings.service';
import { ApplicationSettingsLoaderService } from './infrastructure/application-settings.loader.service';
import { FormsModule } from '@angular/forms';
import { DomEvents } from './services/dom-events.service';
import { DropFactoryService } from './services/drop.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    StoreModule.forFeature(featureName, coreReducers, { metaReducers }),
  ],
  exports: [],
  declarations: [],
})
export class CoreModule {
  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [
        ApplicationSettingsService,
        ApplicationSettingsLoaderService,
        DomEvents,
        DropFactoryService,
      ],
    };
  }
}
