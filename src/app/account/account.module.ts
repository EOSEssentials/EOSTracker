import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AccountRoutingModule } from './account-routing.module';
import { MatTableModule } from '@angular/material/table';

import { AccountsComponent } from './accounts/accounts.component';
import { AccountComponent } from './account/account.component';
import { Accounts1Component } from './accounts1/accounts1.component';

@NgModule({
  imports: [
    SharedModule,
    AccountRoutingModule,
    MatTableModule
  ],
  declarations: [
    AccountsComponent,
    AccountComponent,
    Accounts1Component
  ]
})
export class AccountModule { }
