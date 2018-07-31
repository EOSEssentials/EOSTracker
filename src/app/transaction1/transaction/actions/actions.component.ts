import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TransactionService } from '../../../services/transaction.service';
import { Action } from '../../../models/Action';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-transaction-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss']
})
export class ActionsComponent implements OnInit {

  @Input() id: string;
  transactionActions$: Observable<Action[]>;
  actionsColumns = [
    'id',
    'authorizations',
    'account',
    'name'
  ];

  constructor(
    private route: ActivatedRoute,
    private transactionService: TransactionService
  ) { }

  ngOnInit() {
    this.transactionActions$ = this.route.queryParams.pipe(
      switchMap(queryParams => this.transactionService.getTransactionActions(this.id, queryParams.page))
    );
  }

}
