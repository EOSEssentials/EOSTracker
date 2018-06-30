import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { MatTableModule } from '@angular/material/table';

import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  imports: [
    SharedModule,
    MatTableModule
  ],
  declarations: [
    DashboardComponent
  ]
})
export class Dashboard1Module { }
