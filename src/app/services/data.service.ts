import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { EosService } from './eos.service';
import { Transaction, Action } from '../models';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private http: HttpClient,
    private eosService: EosService
  ) { }

  getTransactionActions(transaction: Transaction, paging = { index: 1, limit: 100 }): Observable<Action[]> {
    return this.http.get(`${environment.apiUrl}/transactions/${transaction.id}/actions`, {
      params: new HttpParams({
        fromString: `page=${paging.index}&size=${paging.limit}`
      })
    }).pipe(
      map((actions: any) => {
        return actions.map(action => action as Action)
          // show actions in ascending order
          .sort((a, b) => a.id > b.id)
          // group actions with parentId, this operation makes sure similar actions are grouped together, [] => [][]
          .reduce((accumulator, current) => {
            if (current.parentId === 0) {
              accumulator.push([current]);
            } else {
              const actions = accumulator.find(a => a[0].id === current.parentId);
              if (actions) {
                actions.push(current);
              }
            }
            return accumulator;
          }, [])
          // flat actions, this operation takes grouped actions and flat them out, [][] => []
          .reduce((accumulator, current) => {
            return accumulator.concat(current);
          }, []);
      }),
      tap(actions => {
        if (actions.length < transaction.numActions) {
          throwError('API actions.length < transaction.numActions');
        }
      }),
      catchError(err => {
        return this.eosService.getTransactionHistory(transaction.id, transaction.blockId).pipe(
          map(transaction => transaction.trx.trx.actions),
          map(actions => actions.map((action, index) => {
            return {
              ...action,
              authorizations: action.authorization,
              parentId: 0,
              seq: index,
              blockId: transaction.blockId,
              transaction: transaction.id
            };
          }))
        );
      })
    );
  }

}
