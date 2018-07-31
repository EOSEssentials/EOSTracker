import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ContractRoutingModule } from './contract-routing.module';
import { MatTableModule } from '@angular/material/table';
import { MatExpansionModule } from '@angular/material/expansion';

import { ContractsComponent } from './contracts/contracts.component';
import { ContractComponent } from './contract/contract.component';

@NgModule({
  imports: [
    SharedModule,
    ContractRoutingModule,
    MatTableModule,
    MatExpansionModule
  ],
  declarations: [
    ContractsComponent,
    ContractComponent
  ]
})
export class ContractModule { }
