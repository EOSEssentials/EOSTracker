import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { NewsRoutingModule } from './news-routing.module';
import { AgmCoreModule } from '@agm/core';
import {MatCardModule} from '@angular/material/card'; 
import {MatGridListModule} from '@angular/material/grid-list'; 
import { NewsComponent } from './news.component';


@NgModule({
  imports: [
    SharedModule,
    NewsRoutingModule,
    MatCardModule,
    MatGridListModule
  ],
  declarations: [
    NewsComponent,
  ]
})
export class NewsModule { }
