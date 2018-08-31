import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { TransactionRoutingModule } from './transaction-routing.module';
import { MatPaginatorModule } from '@angular/material/paginator';

import { TransactionsComponent } from './transactions/transactions.component';
import { TransactionComponent } from './transaction/transaction.component';
import { InformationComponent } from './transaction/information/information.component';
import { DataComponent } from './transaction/data/data.component';
import { ActionsComponent } from './transaction/actions/actions.component';

@NgModule({
  imports: [
    SharedModule,
    TransactionRoutingModule,
    MatPaginatorModule
  ],
  declarations: [
    TransactionsComponent,
    TransactionComponent,
    InformationComponent,
    DataComponent,
    ActionsComponent
  ]
})
export class TransactionModule { }
