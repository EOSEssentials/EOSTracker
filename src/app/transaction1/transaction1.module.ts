import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { Transaction1RoutingModule } from './transaction1-routing.module';

import { TransactionsComponent } from './transactions/transactions.component';
import { TransactionComponent } from './transaction/transaction.component';
import { InformationComponent } from './transaction/information/information.component';
import { DataComponent } from './transaction/data/data.component';
import { ActionsComponent } from './transaction/actions/actions.component';

@NgModule({
  imports: [
    SharedModule,
    Transaction1RoutingModule
  ],
  declarations: [
    TransactionsComponent,
    TransactionComponent,
    InformationComponent,
    DataComponent,
    ActionsComponent
  ]
})
export class Transaction1Module { }
