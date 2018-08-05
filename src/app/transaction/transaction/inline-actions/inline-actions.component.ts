import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { Transaction, Action } from '../../../models';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-transaction-inline-actions',
  templateUrl: './inline-actions.component.html',
  styleUrls: ['./inline-actions.component.scss']
})
export class InlineActionsComponent implements OnInit {

  @Input() transaction: Transaction;
  actions$: Observable<Action[]>;
  actionsColumns = [
    'id',
    'authorizations',
    'account',
    'name'
  ];

  constructor(
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.actions$ = this.dataService.getTransactionActions(this.transaction);
  }

}
