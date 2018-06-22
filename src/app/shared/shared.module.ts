import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { PrettyJsonModule } from 'angular2-prettyjson';

import { PageComponent } from './page/page.component';
import { LoadingComponent } from './page/loading/loading.component';
import { NavbarComponent } from './page/navbar/navbar.component';
import { SidebarComponent } from './page/sidebar/sidebar.component';

import { ToKbPipes } from './pipes/tokb.pipes';

const sharedModules = [
  CommonModule,
  FormsModule,
  RouterModule,
  TranslateModule,
  PrettyJsonModule
];

const sharedComponents = [
  PageComponent,
  LoadingComponent,
  NavbarComponent,
  SidebarComponent
];

const sharedPipes = [
  ToKbPipes
];

@NgModule({
  imports: [
    ...sharedModules
  ],
  declarations: [
    ...sharedComponents,
    ...sharedPipes
  ],
  exports: [
    ...sharedModules,
    ...sharedComponents,
    ...sharedPipes
  ]
})
export class SharedModule { }
