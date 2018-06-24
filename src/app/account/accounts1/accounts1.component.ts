import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from '../../services/account.service';
import { Account } from '../../models/Account';
import { Observable } from 'rxjs';
import { switchMap, map, share } from 'rxjs/operators';

@Component({
  selector: 'app-accounts1',
  templateUrl: './accounts1.component.html',
  styleUrls: ['./accounts1.component.css']
})
export class Accounts1Component implements OnInit {

  columnHeaders = [
    'name',
    'createdAt',
    'updatedAt'
  ];
  accounts$: Observable<Account[]>;

  constructor(
    private route: ActivatedRoute,
    private accountService: AccountService
  ) { }

  ngOnInit() {
    this.accounts$ = this.route.queryParams.pipe(
      map(queryParams => queryParams.page ? Number(queryParams.page) : 1),
      switchMap(page => this.accountService.getAccounts(page)),
      share()
    );
  }

}
