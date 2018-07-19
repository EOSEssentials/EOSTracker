import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { TransactionService } from '../../../services/transaction.service';
import { Transaction } from '../../../models/Transaction';
import { Observable, timer, of } from 'rxjs';
import { switchMap, share, map } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {

  transactions$: Observable<Transaction[]>;
  transactionsColumns$ = of(TRANSACTIONS_COLUMNS);

  constructor(
    private breakpointObserver: BreakpointObserver,
    private transactionService: TransactionService
  ) { }

  ngOnInit() {
    this.transactionsColumns$ = this.breakpointObserver.observe(Breakpoints.XSmall).pipe(
      map(result => result.matches ? TRANSACTIONS_COLUMNS.filter(c => c !== 'createdAt') : TRANSACTIONS_COLUMNS)
    );
    this.transactions$ = timer(0, 5000).pipe(
      switchMap(() => this.transactionService.getTransactions(undefined, 20)),
      share()
    );
  }

}

export const TRANSACTIONS_COLUMNS = [
  'id',
  'createdAt',
  'numActions'
];
