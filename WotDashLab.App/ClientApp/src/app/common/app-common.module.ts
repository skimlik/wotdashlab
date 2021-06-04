import { NgModule } from '@angular/core';

import { SearchBoxComponent } from './search-box/search-box.component';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './nav/navbar.component';
import { AppHeaderComponent } from './header/app-header.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UnixDatePipe } from './unix-date.pipe';
import { PieChartService } from "./charts/pie/pie-chart.service";
import { SecondsToTimePipe } from "./seconds-to-time.pipe";

const toExport = [
  SearchBoxComponent,
  NavbarComponent,
  AppHeaderComponent,
  UnixDatePipe,
  SecondsToTimePipe,
];

@NgModule({
  imports: [CommonModule, FormsModule, RouterModule],
  exports: toExport,
  declarations: [toExport],
  providers: [
    PieChartService
  ],
})
export class AppCommonModule {
}
