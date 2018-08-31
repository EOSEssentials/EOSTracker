import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SafeJsonPipe } from 'angular2-prettyjson';
import { JsonPipe } from '@angular/common';
import { EosService } from './services/eos.service';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { Ng2Webstorage } from 'ngx-webstorage';
import { ScatterService } from './services/scatter.service';
import { AppService } from './services/app.service';
import { LoggerService } from './services/logger.service';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserAnimationsModule,
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
    EosService,
    ScatterService,
    AppService,
    LoggerService,
    { provide: JsonPipe, useClass: SafeJsonPipe }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
