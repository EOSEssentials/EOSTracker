import {Component} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {LocalStorage} from 'ngx-webstorage';

declare let ga: Function;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'EOS Tracker | EosTracker.io';
  @LocalStorage()
  language: any;

  constructor(public router: Router, private translate: TranslateService) {
    translate.setDefaultLang('en');
    if (!this.language) {
      let browserLanguage = ((<any>window).navigator) ? ((<any>window).navigator.userLanguage || (<any>window).navigator.language) : 'en';
      this.language = browserLanguage.substring(0, 2);
    }

    translate.use(this.language);

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd && typeof ga === "function") {
        ga('set', 'page', event.urlAfterRedirects);
        ga('send', 'pageview');
      }
    });
  }
}
