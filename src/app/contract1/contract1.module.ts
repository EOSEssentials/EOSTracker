import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { Contract1RoutingModule } from './contract1-routing.module';
import { MatTableModule } from '@angular/material/table';
import { MatExpansionModule } from '@angular/material/expansion';

import { ContractsComponent } from './contracts/contracts.component';
import { ContractComponent } from './contract/contract.component';

@NgModule({
  imports: [
    SharedModule,
    Contract1RoutingModule,
    MatTableModule,
    MatExpansionModule
  ],
  declarations: [
    ContractsComponent,
    ContractComponent
  ]
})
export class Contract1Module { }
