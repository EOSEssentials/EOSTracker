import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { Block1RoutingModule } from './block1-routing.module';

import { BlocksComponent } from './blocks/blocks.component';
import { BlockComponent } from './block/block.component';
import { InformationComponent } from './block/information/information.component';
import { DataComponent } from './block/data/data.component';
import { TransactionsComponent } from './block/transactions/transactions.component';

@NgModule({
  imports: [
    SharedModule,
    Block1RoutingModule
  ],
  declarations: [
    BlocksComponent,
    BlockComponent,
    InformationComponent,
    DataComponent,
    TransactionsComponent
  ]
})
export class Block1Module { }
