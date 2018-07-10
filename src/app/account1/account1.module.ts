import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { Account1RoutingModule } from './account1-routing.module';

import { AccountsComponent } from './accounts/accounts.component';
import { AccountComponent } from './account/account.component';
import { InformationComponent } from './account/information/information.component';
import { TablesComponent } from './account/tables/tables.component';
import { ActionsComponent } from './account/actions/actions.component';

@NgModule({
  imports: [
    SharedModule,
    Account1RoutingModule
  ],
  declarations: [
    AccountsComponent,
    AccountComponent,
    InformationComponent,
    TablesComponent,
    ActionsComponent
  ]
})
export class Account1Module { }
