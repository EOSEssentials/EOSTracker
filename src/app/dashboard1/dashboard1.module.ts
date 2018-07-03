import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

import { DashboardComponent } from './dashboard/dashboard.component';
import { SettingsComponent } from './settings/settings.component';

@NgModule({
  imports: [
    SharedModule,
    MatFormFieldModule,
    MatSelectModule
  ],
  declarations: [
    DashboardComponent,
    SettingsComponent
  ]
})
export class Dashboard1Module { }
