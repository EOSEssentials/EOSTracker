import { Component, OnChanges, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
import { CustomTokensComponent } from '../custom-tokens/custom-tokens.component';

@Component({
  selector: 'app-account-tokens',
  templateUrl: './tokens.component.html',
  styleUrls: ['./tokens.component.scss']
})
export class TokensComponent implements OnChanges {

  @Input() tokens;
  @Input() account;
  tokensColumns = [
    'logo',
    'name',
    'symbol',
    'account',
    'balance'
  ];

  constructor(
    private matDialog: MatDialog
  ) { }

  ngOnChanges() {
  }

  add() {
    this.matDialog.open(CustomTokensComponent, {
      autoFocus: false,
      data: { account: this.account }
    });
  }

}
