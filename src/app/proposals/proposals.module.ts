import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ProposalsRoutingModule } from './proposals-routing.module';
import { AgmCoreModule } from '@agm/core';
import {MatCardModule} from '@angular/material/card'; 
import {MatGridListModule} from '@angular/material/grid-list'; 
import { ProposalsComponent } from './proposals.component';
import { ProposalComponent } from './proposal/proposal.component';
import {ProgressBarModule} from "angular-progress-bar"

@NgModule({
  imports: [
    SharedModule,
    ProposalsRoutingModule,
    MatCardModule,
    MatGridListModule,
    ProgressBarModule
  ],
  declarations: [
    ProposalsComponent,
    ProposalComponent,
  ]
})
export class ProposalsModule { }
