import { Component, OnInit } from '@angular/core';
import { StatService } from '../../services/stat.service';
import { BlockService } from '../../services/block.service';
import { TransactionService } from '../../services/transaction.service';
import { Block } from '../../models/Block';
import { Transaction } from '../../models/Transaction';
import { Observable, timer } from 'rxjs';
import { switchMap, share } from 'rxjs/operators';

@Component({
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  stats$: Observable<number[]>;
  blocks$: Observable<Block[]>;
  transactions$: Observable<Transaction[]>;
  blocksColumns = [
    'blockNumber',
    'timestamp',
    'producer',
    'numTransactions'
  ];
  transactionsColumns = [
    'id',
    'createdAt',
    'numActions'
  ];

  constructor(
    private statService: StatService,
    private blockService: BlockService,
    private transactionService: TransactionService
  ) { }

  ngOnInit() {
    this.stats$ = timer(0, 5000).pipe(
      switchMap(() => this.statService.getStats())
    );
    this.blocks$ = timer(0, 5000).pipe(
      switchMap(() => this.blockService.getBlocks(undefined, 20)),
      share()
    );
    this.transactions$ = timer(0, 5000).pipe(
      switchMap(() => this.transactionService.getTransactions(undefined, 20)),
      share()
    );
  }

}
