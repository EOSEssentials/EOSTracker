import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ContractRoutingModule } from './contract-routing.module';
import { MatTableModule } from '@angular/material/table';
import { MatExpansionModule } from '@angular/material/expansion';

import { ContractsComponent } from './contracts/contracts.component';
import { ContractComponent } from './contract/contract.component';
import { Contracts1Component } from './contracts1/contracts1.component';
import { Contract1Component } from './contract1/contract1.component';

@NgModule({
  imports: [
    SharedModule,
    ContractRoutingModule,
    MatTableModule,
    MatExpansionModule
  ],
  declarations: [
    ContractsComponent,
    ContractComponent,
    Contracts1Component,
    Contract1Component
  ]
})
export class ContractModule { }
