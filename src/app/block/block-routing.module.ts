import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BlocksComponent } from './blocks/blocks.component';
import { BlockComponent } from './block/block.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: BlocksComponent
  },
  {
    path: ':id',
    component: BlockComponent
  },
  {
    path: ':id/transactions',
    component: BlockComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlockRoutingModule { }
