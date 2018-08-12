import { Component, OnChanges, Input } from '@angular/core';

@Component({
  selector: 'app-account-tokens',
  templateUrl: './tokens.component.html',
  styleUrls: ['./tokens.component.scss']
})
export class TokensComponent implements OnChanges {

  @Input() tokens;
  tokensColumns = [
    'logo',
    'name',
    'symbol',
    'account',
    'balance'
  ];

  constructor() { }

  ngOnChanges() {
  }

}
