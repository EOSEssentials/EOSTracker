import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from '../../services/account.service';
import { Account } from '../../models/Account';
import { Observable } from 'rxjs';
import { switchMap, map, share } from 'rxjs/operators';
import { SeoService } from '../../services/seo.service';

@Component({
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit {

  columnHeaders = [
    'name',
    'createdAt',
    'updatedAt'
  ];
  accounts$: Observable<Account[]>;

  constructor(
    private route: ActivatedRoute,
    private accountService: AccountService,
    private seoService: SeoService
  ) { }

  ngOnInit() {
    this.accounts$ = this.route.queryParams.pipe(
      map(queryParams => queryParams.page ? Number(queryParams.page) : 1),
      switchMap(page => this.accountService.getAccounts(page)),
      share()
    );

    this.seoService.generateTags({
      title: 'EOS Blockchain Accounts',
      description: 'List of EOS Blockchain Accounts',
      image: '',
      slug: 'accounts-page'
    });
  }

}
