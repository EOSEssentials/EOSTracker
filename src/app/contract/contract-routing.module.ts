import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContractsComponent } from './contracts/contracts.component';
import { Contracts1Component } from './contracts1/contracts1.component';
import { ContractComponent } from './contract/contract.component';
import { Contract1Component } from './contract1/contract1.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: Contracts1Component
  },
  {
    path: 'v1',
    component: Contracts1Component
  },
  {
    path: ':id',
    component: Contract1Component
  },
  {
    path: ':id/v1',
    component: Contract1Component
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContractRoutingModule { }
