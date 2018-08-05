import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { TransactionService } from '../../services/transaction.service';
import { Transaction } from '../../models/Transaction';
import { Observable, of } from 'rxjs';
import { switchMap, map, share } from 'rxjs/operators';

@Component({
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {

  columnHeaders$: Observable<string[]> = of(TRANSACTION_COLUMNS);
  transactions$: Observable<Transaction[]>;

  constructor(
    private route: ActivatedRoute,
    private breakpointObserver: BreakpointObserver,
    private transactionService: TransactionService
  ) { }

  ngOnInit() {
    this.columnHeaders$ = this.breakpointObserver.observe(Breakpoints.XSmall).pipe(
      map(result => result.matches ? TRANSACTION_COLUMNS.filter(c => c !== 'expiration') : TRANSACTION_COLUMNS)
    );
    this.transactions$ = this.route.queryParams.pipe(
      map(queryParams => queryParams.page ? Number(queryParams.page) : 1),
      switchMap(page => this.transactionService.getTransactions(page)),
      share()
    );
  }

}

export const TRANSACTION_COLUMNS = [
  'id',
  'blockId',
  'createdAt',
  'expiration',
  'numActions'
];
