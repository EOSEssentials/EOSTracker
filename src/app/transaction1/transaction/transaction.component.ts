import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EosService } from '../../services/eos.service';
import { TransactionService } from '../../services/transaction.service';
import { Transaction } from '../../models/Transaction';
import { Observable, from } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

interface TransactionRaw extends Transaction {
  raw: any;
}

@Component({
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit {

  id$: Observable<string>;
  transaction$: Observable<TransactionRaw>;

  constructor(
    private route: ActivatedRoute,
    private eosService: EosService,
    private transactionService: TransactionService
  ) { }

  ngOnInit() {
    this.id$ = this.route.params.pipe(
      map(params => params.id)
    );
    this.transaction$ = this.id$.pipe(
      switchMap(id => this.transactionService.getTransaction(id)),
      switchMap(transaction => {
        return from(this.eosService.eos.getBlock(transaction.blockId)).pipe(
          map((block: any) => {
            const raw = block.transactions.find(t => t.trx.id === transaction.id);
            return { ...transaction, raw };
          })
        );
      })
    );
  }

}
