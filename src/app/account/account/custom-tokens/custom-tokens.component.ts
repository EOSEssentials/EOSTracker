import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material';
import { AccountService } from '../../../services/account.service';
import { EosService } from '../../../services/eos.service';
import { from } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-custom-tokens',
  templateUrl: './custom-tokens.component.html',
  styleUrls: ['./custom-tokens.component.scss']
})
export class CustomTokensComponent implements OnInit {

  tokenForm = new FormGroup({
    account: new FormControl(''),
    symbol: new FormControl('')
  });
  allTokens$;
  token$;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private accountService: AccountService,
    private eosService: EosService
  ) { }

  ngOnInit() {
    this.allTokens$ = this.accountService.getTokens();
  }

  submit() {
    const token = this.tokenForm.value;
    this.token$ = from(this.eosService.eos.getCurrencyBalance(token.account, this.data.account, token.symbol)).pipe(
      filter((balance: string[]) => balance && balance.length > 0),
      map(balance => balance[0])
    );
  }

}
