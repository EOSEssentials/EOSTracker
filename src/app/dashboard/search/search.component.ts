import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of, empty } from 'rxjs';
import { map, tap, switchMap, catchError } from 'rxjs/operators';
import { EosService } from '../../services/eos.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  query$: Observable<string>;
  result$: Observable<string>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private eosService: EosService
  ) { }

  ngOnInit() {
    this.query$ = this.route.queryParams.pipe(
      map(queryParams => queryParams.q)
    );
    this.result$ = this.query$.pipe(
      switchMap(query => this.tryBlockNumber(query)),
      switchMap(query => this.tryTransaction(query)),
      switchMap(query => this.tryBlockId(query)),
      switchMap(query => this.tryAccount(query)),
      tap(query => console.log('no result', query))
    );
  }

  private tryBlockNumber(query: string): Observable<string> {
    const blockNumber = Number(query);
    if (!isNaN(blockNumber)) {
      return this.eosService.getDeferBlock(blockNumber).pipe(
        catchError(() => of(null)),
        switchMap(data => {
          if (data) {
            this.router.navigate(['/blocks', blockNumber], { replaceUrl: true });
            return empty();
          }
          return of(query);
        })
      );
    }
    return of(query);
  }

  private tryTransaction(query: string): Observable<string> {
    if (query.length === 64) {
      return this.eosService.getDeferTransaction(query).pipe(
        catchError(() => of(null)),
        switchMap(transaction => {
          if (transaction) {
            this.router.navigate(['/transactions', transaction.block_num, transaction.id], { replaceUrl: true });
            return empty();
          }
          return of(query);
        })
      );
    }
    return of(query);
  }

  private tryBlockId(query: string): Observable<string> {
    if (query.length === 64) {
      return this.eosService.getDeferBlock(query).pipe(
        catchError(() => of(null)),
        switchMap(block => {
          if (block) {
            this.router.navigate(['/blocks', block.block_num], { replaceUrl: true });
            return empty();
          }
          return of(query);
        })
      );
    }
    return of(query);
  }

  private tryAccount(query: string): Observable<string> {
    if (query.length <= 12) {
      return this.eosService.getDeferAccount(query).pipe(
        catchError(() => of(null)),
        switchMap(account => {
          if (account) {
            this.router.navigate(['/accounts', account.account_name], { replaceUrl: true });
            return empty();
          }
          return of(query);
        })
      );
    }
    return of(query);
  }

}
