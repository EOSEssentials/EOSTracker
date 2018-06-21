import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AccountRoutingModule } from './account-routing.module';

import { AccountsComponent } from './accounts/accounts.component';
import { AccountComponent } from './account/account.component';

@NgModule({
  imports: [
    SharedModule,
    AccountRoutingModule
  ],
  declarations: [
    AccountsComponent,
    AccountComponent
  ]
})
export class AccountModule { }
