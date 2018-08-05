import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { TransactionRoutingModule } from './transaction-routing.module';

import { TransactionsComponent } from './transactions/transactions.component';
import { TransactionComponent } from './transaction/transaction.component';
import { InformationComponent } from './transaction/information/information.component';
import { DataComponent } from './transaction/data/data.component';
import { ActionsComponent } from './transaction/actions/actions.component';
import { InlineActionsComponent } from './transaction/inline-actions/inline-actions.component';

@NgModule({
  imports: [
    SharedModule,
    TransactionRoutingModule
  ],
  declarations: [
    TransactionsComponent,
    TransactionComponent,
    InformationComponent,
    DataComponent,
    ActionsComponent,
    InlineActionsComponent
  ]
})
export class TransactionModule { }
