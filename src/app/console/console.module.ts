import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ConsoleRoutingModule } from './console-routing.module';

import { ConsoleComponent } from './console/console.component';

@NgModule({
  imports: [
    SharedModule,
    ConsoleRoutingModule
  ],
  declarations: [
    ConsoleComponent
  ]
})
export class ConsoleModule { }
