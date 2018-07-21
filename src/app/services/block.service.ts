import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Block, Transaction, Result } from '../models';
import { EosService } from './eos.service';

@Injectable()
export class BlockService {

  constructor(
    private http: HttpClient,
    private eosService: EosService
  ) { }

  getBlock(id: number): Observable<Result<Block>> {
    return this.http.get(`${environment.apiUrl}/blocks/${id}`).pipe(
      map(block => {
        return <Result<Block>>{
          isError: false,
          value: block as Block
        };
      }),
      catchError(error => {
        console.log('TODO: API Error', error);
        return this.eosService.getBlock(id);
      })
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
