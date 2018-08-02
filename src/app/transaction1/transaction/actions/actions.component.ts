import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EosService } from '../../../services/eos.service';
import { TransactionService } from '../../../services/transaction.service';
import { Transaction, Action } from '../../../models';
import { Observable, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

@Component({
  selector: 'app-transaction-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss']
})
export class ActionsComponent implements OnInit {

  @Input() transaction: Transaction;
  transactionActions$: Observable<Action[]>;
  actionsColumns = [
    'id',
    'authorizations',
    'account',
    'name'
  ];

  constructor(
    private route: ActivatedRoute,
    private eosService: EosService,
    private transactionService: TransactionService
  ) { }

  ngOnInit() {
    this.transactionActions$ = this.route.queryParams.pipe(
      switchMap(queryParams => this.transactionService.getTransactionActions(this.transaction.id, queryParams.page)),
      switchMap(actions => {
        if (actions.length < this.transaction.numActions) {
          return this.eosService.getTransactionHistory(this.transaction.id, this.transaction.blockId).pipe(
            map(transaction => transaction.trx.trx.actions),
            map(actions => actions.map(action => ({ ...action, authorizations: action.authorization })))
          );
        } else {
          return of(actions);
        }
      })
    );
  }

}
