import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BlockService } from './services/block.service';
import { TransactionService } from './services/transaction.service';
import { DashboardService } from './services/dashboard.service';
import { AccountService } from './services/account.service';
import { ProducerService } from './services/producer.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SafeJsonPipe } from 'angular2-prettyjson';
import { JsonPipe } from '@angular/common';
import { EosService } from './services/eos.service';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { Ng2Webstorage } from 'ngx-webstorage';
import { CmcService } from './services/cmc.service';
import { ActionService } from './services/action.service';
import { StatService } from './services/stat.service';
import { VoteService } from './services/vote.service';
import { BpService } from './services/bp.service';
import {ScatterService} from './services/scatter.service';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    Ng2Webstorage,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    SharedModule,
    AppRoutingModule
  ],
  providers: [
    BlockService,
    TransactionService,
    DashboardService,
    EosService,
    ScatterService,
    AccountService,
    ProducerService,
    CmcService,
    ActionService,
    StatService,
    VoteService,
    BpService,
    { provide: JsonPipe, useClass: SafeJsonPipe }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
