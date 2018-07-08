import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { Block1RoutingModule } from './block1-routing.module';
import { MatTabsModule } from '@angular/material/tabs';
import { MatBadgeModule } from '@angular/material/badge';

import { BlocksComponent } from './blocks/blocks.component';
import { BlockComponent } from './block/block.component';
import { InformationComponent } from './block/information/information.component';
import { DataComponent } from './block/data/data.component';
import { TransactionsComponent } from './block/transactions/transactions.component';

@NgModule({
  imports: [
    SharedModule,
    Block1RoutingModule,
    MatTabsModule,
    MatBadgeModule
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
