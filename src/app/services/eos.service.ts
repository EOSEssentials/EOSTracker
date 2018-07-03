import { Injectable } from '@angular/core';
import * as Eos from 'eosjs';
import { environment } from '../../environments/environment';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class EosService {
  public eos: any;

  constructor() {
    this.eos = Eos({ httpEndpoint: environment.blockchainUrl });
  }

  getAccount(name: string): Observable<any> {
    return from(this.eos.getAccount(name));
  }

  getCurrencyBalance(name: string): Observable<number> {
    return from(this.eos.getCurrencyBalance('eosio.token', name, 'EOS')).pipe(
      map(result => {
        if (result && result[0]) {
          return parseFloat(result[0].replace(' EOS', ''));
        }
        return 0;
      })
    );
  }

  getRamPrice(): Observable<number> {
    return from(this.eos.getTableRows({
      json: true,
      code: "eosio",
      scope: "eosio",
      table: "rammarket",
      limit: 1
    })).pipe(
      map((result: any) => {
        let base = parseFloat(result.rows[0].base.balance.replace(' RAM', ''));
        let quote = parseFloat(result.rows[0].quote.balance.replace(' EOS', ''));
        return quote / base;
      })
    );
  }
}
