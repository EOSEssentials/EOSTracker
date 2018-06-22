import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { TransactionRoutingModule } from './transaction-routing.module';

import { TransactionsComponent } from './transactions/transactions.component';
import { TransactionComponent } from './transaction/transaction.component';

@NgModule({
  imports: [
    SharedModule,
    TransactionRoutingModule
  ],
  declarations: [
    TransactionsComponent,
    TransactionComponent
  ]
})
export class TransactionModule { }
