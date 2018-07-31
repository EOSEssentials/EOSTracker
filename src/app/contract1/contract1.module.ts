import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { Contract1RoutingModule } from './contract1-routing.module';

import { ContractsComponent } from './contracts/contracts.component';
import { ContractComponent } from './contract/contract.component';
import { InformationComponent } from './contract/information/information.component';

@NgModule({
  imports: [
    SharedModule,
    Contract1RoutingModule
  ],
  declarations: [
    ContractsComponent,
    ContractComponent,
    InformationComponent
  ]
})
export class Contract1Module { }
