import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { SupportRoutingModule } from './support-routing.module';

import {SupportComponent} from './support.component';

@NgModule({
  imports: [
    SharedModule,
    SupportRoutingModule
  ],
  declarations: [
    SupportComponent
  ]
})
export class SupportModule { }
