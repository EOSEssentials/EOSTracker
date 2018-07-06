import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { Producer1RoutingModule } from './producer1-routing.module';
import { AgmCoreModule } from '@agm/core';

import { ProducersComponent } from './producers/producers.component';
import { ProducerComponent } from './producer/producer.component';

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
    ProducerComponent
  ]
})
export class Producer1Module { }
