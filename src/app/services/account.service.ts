import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Account } from '../models/Account';
import { Action } from '../models/Action';
import {Token} from '../models/Token';

@Injectable()
export class AccountService {

  constructor(
    private http: HttpClient
  ) { }

  getAccount(name: string): Observable<Account> {
    return this.http.get(`${environment.apiUrl}/accounts/${name}`).pipe(
      map(account => account as Account)
    );
  }

  getAccountKey(key: string): Observable<Account> {
    return this.http.get(`${environment.apiUrl}/accounts/key/${key}`).pipe(
      map(account => account as Account)
    );
  }

  getAccounts(page = 1): Observable<Account[]> {
    return this.http.get(`${environment.apiUrl}/accounts`, {
      params: new HttpParams({
        fromString: `page=${page}`
      })
    }).pipe(
      map((accounts: any) => accounts.map(account => account as Account))
    );
  }

  getAccountActionsSent(name: string, page = 1): Observable<Action[]> {
    return this.http.get(`${environment.apiUrl}/accounts/${name}/actions`, {
      params: new HttpParams({
        fromString: `page=${page}`
      })
    }).pipe(
      map((actions: any) => actions.map(action => action as Action))
    );
  }

  getAccountActionsReceived(name: string, page = 1): Observable<Action[]> {
    return this.http.get(`${environment.apiUrl}/accounts/${name}/actions/to`, {
      params: new HttpParams({
        fromString: `page=${page}`
      })
    }).pipe(
      map((actions: any) => actions.map(action => action as Action))
    );
  }

  getTokens(): Observable<Token[]> {
    return this.http.get(`https://raw.githubusercontent.com/eoscafe/eos-airdrops/master/tokens.json`).pipe(
      map((tokens: any) => tokens.map(token => token as Token))
    );
  }
}
