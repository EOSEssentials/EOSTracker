import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { Producer1RoutingModule } from './producer1-routing.module';
import { AgmCoreModule } from '@agm/core';

import { ProducersComponent } from './producers/producers.component';
import { ProducerComponent } from './producer/producer.component';
import { VoteProgressBarComponent } from './vote-progress-bar/vote-progress-bar.component';
import { InformationComponent } from './producer/information/information.component';
import { NodesComponent } from './producer/nodes/nodes.component';
import { VotesComponent } from './producer/votes/votes.component';

@NgModule({
  imports: [
    SharedModule,
    Producer1RoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAm8XqMj1dCSiEDlfb4c5KlZ9kbcBmTLS0'
    })
  ],
  declarations: [
    ProducersComponent,
    ProducerComponent,
    VoteProgressBarComponent,
    InformationComponent,
    NodesComponent,
    VotesComponent
  ]
})
export class Producer1Module { }
