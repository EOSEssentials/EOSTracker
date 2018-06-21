import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ContractRoutingModule } from './contract-routing.module';

import { ContractsComponent } from './contracts/contracts.component';
import { ContractComponent } from './contract/contract.component';

@NgModule({
  imports: [
    SharedModule,
    ContractRoutingModule
  ],
  declarations: [
    ContractsComponent,
    ContractComponent
  ]
})
export class ContractModule { }
