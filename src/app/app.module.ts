import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {PageComponent} from './components/shared/page/page.component';
import {NavbarComponent} from './components/shared/page/navbar/navbar.component';
import {SidebarComponent} from './components/shared/page/sidebar/sidebar.component';
import {BlocksComponent} from './components/blocks/blocks.component';
import {BlockComponent} from './components/block/block.component';
import {TransactionsComponent} from './components/transactions/transactions.component';
import {TransactionComponent} from './components/transaction/transaction.component';
import {AccountsComponent} from './components/accounts/accounts.component';
import {AccountComponent} from './components/account/account.component';
import {ProducersComponent} from './components/producers/producers.component';
import {ContractsComponent} from './components/contracts/contracts.component';
import {ContractComponent} from './components/contract/contract.component';
import {SearchComponent} from './components/search/search.component';
import {BlockService} from './services/block.service';
import {TransactionService} from './services/transaction.service';
import {DashboardService} from './services/dashboard.service';
import {FormsModule} from '@angular/forms';
import {AccountService} from './services/account.service';
import {ProducerService} from './services/producer.service';
import {LoadingComponent} from './components/shared/page/loading/loading.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {PrettyJsonModule, SafeJsonPipe} from 'angular2-prettyjson';
import {JsonPipe} from '@angular/common';
import {EosService} from './services/eos.service';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {Ng2Webstorage} from 'ngx-webstorage';
import { SettingsComponent } from './components/settings/settings.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

const appRoutes: Routes = [
  {path: '', component: DashboardComponent},
  {path: 'blocks', component: BlocksComponent},
  {path: 'blocks/:id', component: BlockComponent},
  {path: 'transactions', component: TransactionsComponent},
  {path: 'transactions/:id', component: TransactionComponent},
  {path: 'accounts', component: AccountsComponent},
  {path: 'settings', component: SettingsComponent},
  {path: 'accounts/:id', component: AccountComponent},
  {path: 'actions', component: ContractsComponent},
  {path: 'actions/:index/:id', component: ContractComponent},
  {path: 'search', component: SearchComponent},
  {path: 'producers', component: ProducersComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    PageComponent,
    NavbarComponent,
    SidebarComponent,
    BlocksComponent,
    BlockComponent,
    TransactionsComponent,
    TransactionComponent,
    AccountsComponent,
    AccountComponent,
    ProducersComponent,
    ContractsComponent,
    ContractComponent,
    SearchComponent,
    LoadingComponent,
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    Ng2Webstorage,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    PrettyJsonModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    BlockService,
    TransactionService,
    DashboardService,
    EosService,
    AccountService,
    ProducerService,
    {provide: JsonPipe, useClass: SafeJsonPipe}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
