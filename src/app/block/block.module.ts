import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { BlockRoutingModule } from './block-routing.module';

import { BlocksComponent } from './blocks/blocks.component';
import { BlockComponent } from './block/block.component';

@NgModule({
  imports: [
    SharedModule,
    BlockRoutingModule
  ],
  declarations: [
    BlocksComponent,
    BlockComponent
  ]
})
export class BlockModule { }
