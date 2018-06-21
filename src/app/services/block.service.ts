import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Block } from '../models/Block';
import { Transaction } from '../models/Transaction';

@Injectable()
export class BlockService {

  constructor(
    private http: HttpClient
  ) { }

  getBlock(id: number): Observable<Block> {
    return this.http.get(`${environment.apiUrl}/blocks/${id}`).pipe(
      map(block => block as Block)
    );
  }

  getBlockId(id: string): Observable<Block> {
    return this.http.get(`${environment.apiUrl}/blocks/id/${id}`).pipe(
      map(block => block as Block)
    );
  }

  getBlocks(page = 1, size = 30): Observable<Block[]> {
    return this.http.get(`${environment.apiUrl}/blocks`, {
      params: new HttpParams({
        fromString: `page=${page}&size=${size}`
      })
    }).pipe(
      map((blocks: any) => blocks.map(block => block as Block))
    );
  }

  getBlockTransactions(id: number, page = 1): Observable<Transaction[]> {
    return this.http.get(`${environment.apiUrl}/blocks/${id}/transactions`, {
      params: new HttpParams({
        fromString: `page=${page}`
      })
    }).pipe(
      map((transactions: any) => transactions.map(transaction => transaction as Transaction))
    );
  }
}
