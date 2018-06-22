import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { SearchComponent } from './search/search.component';
import { SettingsComponent } from './settings/settings.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    DashboardComponent,
    SearchComponent,
    SettingsComponent
  ]
})
export class DashboardModule { }
