import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { Block1RoutingModule } from './block1-routing.module';

import { BlocksComponent } from './blocks/blocks.component';
import { BlockComponent } from './block/block.component';

@NgModule({
  imports: [
    SharedModule,
    Block1RoutingModule
  ],
  declarations: [
    BlocksComponent,
    BlockComponent
  ]
})
export class Block1Module { }
