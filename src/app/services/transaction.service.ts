import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Transaction } from '../models/Transaction';
import { Action } from '../models/Action';

@Injectable()
export class TransactionService {

  constructor(
    private http: HttpClient
  ) { }

  getTransaction(id: string): Observable<Transaction> {
    return this.http.get(`${environment.apiUrl}/transactions/${id}`).pipe(
      map(transaction => transaction as Transaction)
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
