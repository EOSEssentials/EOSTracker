import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../../../services/transaction.service';
import { Transaction } from '../../../models/Transaction';
import { Observable, timer } from 'rxjs';
import { switchMap, share } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {

  transactions$: Observable<Transaction[]>;
  transactionsColumns = [
    'id',
    'createdAt',
    'numActions'
  ];

  constructor(
    private transactionService: TransactionService
  ) { }

  ngOnInit() {
    this.transactions$ = timer(0, 5000).pipe(
      switchMap(() => this.transactionService.getTransactions(undefined, 20)),
      share()
    );
  }

}
