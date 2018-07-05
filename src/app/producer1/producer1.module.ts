import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { Producer1RoutingModule } from './producer1-routing.module';

import { ProducersComponent } from './producers/producers.component';
import { ProducerComponent } from './producer/producer.component';

@NgModule({
  imports: [
    SharedModule,
    Producer1RoutingModule
  ],
  declarations: [
    ProducersComponent,
    ProducerComponent
  ]
})
export class Producer1Module { }
