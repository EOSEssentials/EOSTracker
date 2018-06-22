import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProducersComponent } from './producers/producers.component';
import { ProducerComponent } from './producer/producer.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: ProducersComponent
  },
  {
    path: ':id',
    component: ProducerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProducerRoutingModule { }
