import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Dashboard1Module } from './dashboard1/dashboard1.module';

import { MasterpageComponent } from './shared/masterpage/masterpage.component';
import { DashboardComponent } from './dashboard1/dashboard/dashboard.component';
import { SettingsComponent } from './dashboard1/settings/settings.component';
import { SearchComponent } from './dashboard1/search/search.component';

const appRoutes: Routes = [
  {
    path: '',
    component: MasterpageComponent,
    children: [
      { path: '', pathMatch: 'full', component: DashboardComponent },
      { path: 'search', component: SearchComponent },
      { path: 'settings', component: SettingsComponent },
      { path: 'accounts', loadChildren: './account1/account1.module#Account1Module' },
      { path: 'blocks', loadChildren: './block1/block1.module#Block1Module' },
      { path: 'actions', loadChildren: './contract1/contract1.module#Contract1Module' },
      { path: 'producers', loadChildren: './producer1/producer1.module#Producer1Module' },
      { path: 'transactions', loadChildren: './transaction1/transaction1.module#Transaction1Module' },
      { path: 'support', loadChildren: './support/support.module#SupportModule' }
    ]
  }
];

@NgModule({
  imports: [
    Dashboard1Module,
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
