import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslateModule } from '@ngx-translate/core';
import { MomentModule } from 'ngx-moment';
import { PrettyJsonModule } from 'angular2-prettyjson';
import { NgxJsonViewerModule } from 'ngx-json-viewer';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';
import { MatBadgeModule } from '@angular/material/badge';

import { TableComponent } from './table/table.component';
import { MasterpageComponent } from './masterpage/masterpage.component';
import { HeaderComponent } from './masterpage/header/header.component';
import { SearchComponent } from './masterpage/search/search.component';
import { SidenavComponent } from './masterpage/sidenav/sidenav.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { ErrorComponent } from './error/error.component';
import { Id64Component } from './id64/id64.component';

import { ToKbPipes } from './pipes/tokb.pipes';

const sharedModules = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  RouterModule,
  FlexLayoutModule,
  TranslateModule,
  MomentModule,
  PrettyJsonModule,
  NgxJsonViewerModule
];

const sharedMaterialModules = [
  MatSidenavModule,
  MatListModule,
  MatIconModule,
  MatToolbarModule,
  MatButtonModule,
  MatProgressSpinnerModule,
  MatProgressBarModule,
  MatCardModule,
  MatTableModule,
  MatExpansionModule,
  MatTabsModule,
  MatBadgeModule
];

const sharedComponents = [
  TableComponent,
  MasterpageComponent,
  HeaderComponent,
  SearchComponent,
  SidenavComponent,
  SpinnerComponent,
  ErrorComponent,
  Id64Component
];

const sharedPipes = [
  ToKbPipes
];

@NgModule({
  imports: [
    ...sharedModules,
    ...sharedMaterialModules
  ],
  declarations: [
    ...sharedComponents,
    ...sharedPipes
  ],
  exports: [
    ...sharedModules,
    ...sharedMaterialModules,
    ...sharedComponents,
    ...sharedPipes
  ]
})
export class SharedModule { }
