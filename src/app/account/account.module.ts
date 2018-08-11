import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AccountRoutingModule } from './account-routing.module';

import { AccountsComponent } from './accounts/accounts.component';
import { AccountComponent } from './account/account.component';
import { InformationComponent } from './account/information/information.component';
import { TablesComponent } from './account/tables/tables.component';
import { ActionsComponent } from './account/actions/actions.component';
import { TokensComponent } from './account/tokens/tokens.component';

@NgModule({
  imports: [
    SharedModule,
    AccountRoutingModule
  ],
  declarations: [
    AccountsComponent,
    AccountComponent,
    InformationComponent,
    TablesComponent,
    ActionsComponent,
    TokensComponent
  ]
})
export class AccountModule { }
