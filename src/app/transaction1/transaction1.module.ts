import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { Transaction1RoutingModule } from './transaction1-routing.module';

import { TransactionsComponent } from './transactions/transactions.component';
import { TransactionComponent } from './transaction/transaction.component';

@NgModule({
  imports: [
    SharedModule,
    Transaction1RoutingModule
  ],
  declarations: [
    TransactionsComponent,
    TransactionComponent
  ]
})
export class Transaction1Module { }
