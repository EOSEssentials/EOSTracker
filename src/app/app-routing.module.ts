import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardModule } from './dashboard/dashboard.module';
import { Dashboard1Module } from './dashboard1/dashboard1.module';

import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { SearchComponent } from './dashboard/search/search.component';
import { SettingsComponent } from './dashboard/settings/settings.component';
import { MasterpageComponent } from './shared/masterpage/masterpage.component';

import { DashboardComponent as DC1 } from './dashboard1/dashboard/dashboard.component';
import { SettingsComponent as SC1 } from './dashboard1/settings/settings.component';

const appRoutes: Routes = [
  { path: '', pathMatch: 'full', component: DashboardComponent },
  { path: 'search', component: SearchComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'accounts', loadChildren: './account/account.module#AccountModule' },
  { path: 'blocks', loadChildren: './block/block.module#BlockModule' },
  { path: 'actions', loadChildren: './contract/contract.module#ContractModule' },
  { path: 'producers', loadChildren: './producer/producer.module#ProducerModule' },
  { path: 'transactions', loadChildren: './transaction/transaction.module#TransactionModule' },
  { path: 'support', loadChildren: './support/support.module#SupportModule' },
  {
    path: 'v1',
    component: MasterpageComponent,
    children: [
      { path: '', pathMatch: 'full', component: DC1 },
      // { path: 'search', component: SearchComponent },
      { path: 'settings', component: SC1 },
      { path: 'accounts', loadChildren: './account1/account1.module#Account1Module' },
      { path: 'blocks', loadChildren: './block1/block1.module#Block1Module' },
      { path: 'actions', loadChildren: './contract1/contract1.module#Contract1Module' },
      // { path: 'producers', loadChildren: './producer/producer.module#ProducerModule' },
      { path: 'transactions', loadChildren: './transaction1/transaction1.module#Transaction1Module' }
    ]
  }
];

@NgModule({
  imports: [
    DashboardModule,
    Dashboard1Module,
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
