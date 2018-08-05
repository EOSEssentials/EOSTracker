import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ContractRoutingModule } from './contract-routing.module';

import { ContractsComponent } from './contracts/contracts.component';
import { ContractComponent } from './contract/contract.component';
import { InformationComponent } from './contract/information/information.component';

@NgModule({
  imports: [
    SharedModule,
    ContractRoutingModule
  ],
  declarations: [
    ContractsComponent,
    ContractComponent,
    InformationComponent
  ]
})
export class ContractModule { }
