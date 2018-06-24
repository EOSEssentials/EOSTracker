import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountsComponent } from './accounts/accounts.component';
import { AccountComponent } from './account/account.component';
import { Accounts1Component } from './accounts1/accounts1.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: AccountsComponent
  },
  {
    path: 'v1',
    component: Accounts1Component
  },
  {
    path: ':id',
    component: AccountComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
