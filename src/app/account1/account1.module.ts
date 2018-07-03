import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { Account1RoutingModule } from './account1-routing.module';

import { AccountsComponent } from './accounts/accounts.component';
import { AccountComponent } from './account/account.component';

@NgModule({
  imports: [
    SharedModule,
    Account1RoutingModule
  ],
  declarations: [
    AccountsComponent,
    AccountComponent
  ]
})
export class Account1Module { }
