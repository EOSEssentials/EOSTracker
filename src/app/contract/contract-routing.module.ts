import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContractsComponent } from './contracts/contracts.component';
import { ContractComponent } from './contract/contract.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: ContractsComponent
  },
  {
    path: ':id',
    component: ContractComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContractRoutingModule { }
