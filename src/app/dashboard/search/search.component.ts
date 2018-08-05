import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of, empty } from 'rxjs';
import { map, tap, switchMap, catchError } from 'rxjs/operators';
import { TransactionService } from '../../services/transaction.service';
import { BlockService } from '../../services/block.service';
import { AccountService } from '../../services/account.service';

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
    private transactionService: TransactionService,
    private blockService: BlockService,
    private accountService: AccountService
  ) { }

  ngOnInit() {
    this.query$ = this.route.queryParams.pipe(
      map(queryParams => queryParams.q)
    );
    this.result$ = this.query$.pipe(
      switchMap(query => this.tryBlockNumber(query)),
      switchMap(query => this.tryTransaction(query)),
      switchMap(query => this.tryBlockId(query)),
      switchMap(query => this.tryAccountKey(query)),
      switchMap(query => this.tryAccount(query)),
      tap(query => console.log('no result', query))
    );
  }

  private tryBlockNumber(query: string): Observable<string> {
    const blockNumber = Number(query);
    if (!isNaN(blockNumber)) {
      return this.blockService.getBlock(blockNumber).pipe(
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
      return this.transactionService.getTransaction(query).pipe(
        catchError(() => of(null)),
        switchMap(data => {
          if (data) {
            this.router.navigate(['/transactions', query], { replaceUrl: true });
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
      return this.blockService.getBlockId(query).pipe(
        catchError(() => of(null)),
        switchMap(data => {
          if (data) {
            this.router.navigate(['/blocks', data['blockNumber']], { replaceUrl: true });
            return empty();
          }
          return of(query);
        })
      );
    }
    return of(query);
  }

  private tryAccountKey(query: string): Observable<string> {
    if (query.length === 53) {
      return this.accountService.getAccountKey(query).pipe(
        catchError(() => of(null)),
        switchMap(data => {
          if (data) {
            this.router.navigate(['/accounts', data['name']], { replaceUrl: true });
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
      return this.accountService.getAccount(query).pipe(
        catchError(() => of(null)),
        switchMap(data => {
          if (data) {
            this.router.navigate(['/accounts', data['name']], { replaceUrl: true });
            return empty();
          }
          return of(query);
        })
      );
    }
    return of(query);
  }

}
