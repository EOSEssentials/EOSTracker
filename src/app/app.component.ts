import {Component} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';

declare let ga: Function;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'EOS Tracker | EosTracker.io';

  constructor(public router: Router, private translate: TranslateService) {
    translate.setDefaultLang('es');
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd && typeof ga === "function") {
        ga('set', 'page', event.urlAfterRedirects);
        ga('send', 'pageview');
      }
    });
  }

  switchLanguage(language: string) {
    this.translate.use(language);
  }
}
