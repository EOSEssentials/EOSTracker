import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AccountRoutingModule } from './account-routing.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { AccountComponent } from './account/account.component';
import { InformationComponent } from './account/information/information.component';
import { TablesComponent } from './account/tables/tables.component';
import { ActionsComponent } from './account/actions/actions.component';
import { TokensComponent } from './account/tokens/tokens.component';
import { CustomTokensComponent } from './account/custom-tokens/custom-tokens.component';

@NgModule({
  imports: [
    SharedModule,
    AccountRoutingModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    NgxChartsModule
  ],
  declarations: [
    AccountComponent,
    InformationComponent,
    TablesComponent,
    ActionsComponent,
    TokensComponent,
    CustomTokensComponent
  ],
  entryComponents: [
    CustomTokensComponent
  ]
})
export class AccountModule { }
