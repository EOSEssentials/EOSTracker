import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {LocalStorage} from 'ngx-webstorage';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  public selectedLang;
  public allowedLanguages = ['en', 'es', 'fr', 'hr', 'it', 'ko', 'de', 'dk', 'pt', 'sl', 'zh'];
  @LocalStorage()
  language: any;

  constructor(private translate: TranslateService) {
    this.selectedLang = this.language;
  }

  ngOnInit() {
  }

  onChange(newLanguage) {
    this.language = newLanguage;
    this.translate.use(newLanguage);
  }
}
