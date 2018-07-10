import { Component, OnInit, Input } from '@angular/core';
import { AccountService } from '../../../services/account.service';
import { Action } from '../../../models/Action';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-account-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss']
})
export class InformationComponent implements OnInit {

  @Input() account;
  @Input() eosPrice: number;
  accountActionsSent$: Observable<Action[]>;
  accountActionsReceived$: Observable<Action[]>;

  constructor(
    private accountService: AccountService
  ) { }

  ngOnInit() {
    this.accountActionsSent$ = this.accountService.getAccountActionsSent(this.account.name);
    this.accountActionsReceived$ = this.accountService.getAccountActionsReceived(this.account.name);
  }

}
