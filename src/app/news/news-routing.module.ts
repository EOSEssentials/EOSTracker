import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewsComponent } from './news.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: NewsComponent
  },
  // {
  //   path: ':id',
  //   component: ProducerComponent
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewsRoutingModule { }
