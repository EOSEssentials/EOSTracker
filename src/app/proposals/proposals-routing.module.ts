import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProposalsComponent } from './proposals.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: ProposalsComponent
  },
  // {
  //   path: ':id',
  //   component: ProducerComponent
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProposalsRoutingModule { }
