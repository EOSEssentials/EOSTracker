import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlockService } from '../../../services/block.service';
import { Block, Transaction } from '../../../models';
import { Observable, of } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-block-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {

  @Input() block: Block;
  blockTransactions$: Observable<Transaction[]>;
  transactionsColumns = [
    'id',
    'blockId',
    'createdAt',
    'numActions'
  ];
  isError = false;

  constructor(
    private route: ActivatedRoute,
    private blockService: BlockService
  ) { }

  ngOnInit() {
    if (this.block.chainData) {
      this.blockTransactions$ = of(this.block.chainData.transactions.map(transaction => {
        return {
          blockId: this.block.chainData.block_num,
          createdAt: new Date(this.block.chainData.timestamp).getTime() / 1000,
          expiration: new Date(transaction.trx.transaction.expiration).getTime() / 1000,
          id: transaction.trx.id,
          numActions: transaction.trx.transaction.actions.length,
          pending: transaction.trx.transaction.delay_sec > 0,
          updatedAt: new Date(this.block.chainData.timestamp).getTime() / 1000
        };
      }));
    } else {
      this.blockTransactions$ = this.route.queryParams.pipe(
        switchMap(queryParams => this.blockService.getBlockTransactions(this.block.blockNumber, queryParams.page)),
        catchError(err => {
          this.isError = true;
          return of([]);
        })
      );
    }
  }

}
