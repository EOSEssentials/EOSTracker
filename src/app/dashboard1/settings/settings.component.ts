import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { LocalStorage } from 'ngx-webstorage';

@Component({
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  @LocalStorage() language: string;
  languages = LANGUAGES;
  languageControl: FormControl;

  constructor(
    private translate: TranslateService
  ) { }

  ngOnInit() {
    // initialize language select control
    this.languageControl = new FormControl();
    // set initial language select control value with LocalStorage value
    this.languageControl.setValue(this.language);
    // subscribe to language select control value change
    this.languageControl.valueChanges.subscribe(language => {
      this.language = language;
      this.translate.use(language);
    });
  }

}

export const LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'hr', name: 'Croatian' },
  { code: 'it', name: 'Italian' },
  { code: 'ko', name: 'Korean' },
  { code: 'de', name: 'German' },
  { code: 'dk', name: 'Danish' },
  { code: 'pt', name: 'Portuguese' },
  { code: 'sl', name: 'Slovenian' },
  { code: 'zh', name: 'Chinese' }
];
