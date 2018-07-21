import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Transaction } from '../models/Transaction';
import { Action } from '../models/Action';
import { Result } from '../models/Result';
import { EosService } from './eos.service';

@Injectable()
export class TransactionService {

  constructor(
    private http: HttpClient,
    private eosService: EosService
  ) { }

  getTransaction(id: string): Observable<Result<Transaction>> {
    return this.http.get(`${environment.apiUrl}/transactions/${id}`).pipe(
      map(transaction => {
        return <Result<Transaction>>{
          isError: false,
          value: transaction as Transaction
        };
      }),
      catchError(error => {
        console.log('TODO: API Error', error);
        return this.eosService.getTransaction(id);
      })
    );
  }

  getTransactions(page = 1, size = 30): Observable<Transaction[]> {
    return this.http.get(`${environment.apiUrl}/transactions`, {
      params: new HttpParams({
        fromString: `page=${page}&size=${size}`
      })
    }).pipe(
      map((transactions: any) => transactions.map(transaction => transaction as Transaction))
    );
  }

  getTransactionActions(id: string, page = 1): Observable<Action[]> {
    return this.http.get(`${environment.apiUrl}/transactions/${id}/actions`, {
      params: new HttpParams({
        fromString: `page=${page}`
      })
    }).pipe(
      map((actions: any) => actions.map(action => action as Action))
    );
  }
}
