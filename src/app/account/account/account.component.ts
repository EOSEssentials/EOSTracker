import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EosService } from '../../services/eos.service';
import { AppService } from '../../services/app.service';
import { Result } from '../../models';
import { Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

@Component({
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  name$: Observable<string>;
  account$: Observable<Result<any>>;
  accountTokens$: Observable<any>;
  accountActions$: Observable<Result<any[]>>;
  accountNewActions$: Observable<Result<any[]>>;
  accountAbi$: Observable<Result<any>>;

  constructor(
    private route: ActivatedRoute,
    private eosService: EosService,
    public app: AppService
  ) { }

  ngOnInit() {
    this.name$ = this.route.params.pipe(
      map(params => params.id)
    );
    this.account$ = this.name$.pipe(
      switchMap(name => this.eosService.getAccountRaw(name)),
      tap(account => console.log('account', account))
    );
    this.accountTokens$ = this.name$.pipe(
      switchMap(name => this.eosService.getAccountTokens(name))
    );
    this.accountActions$ = this.name$.pipe(
      switchMap(name => this.eosService.getAccountActions(name))
    );
    this.accountAbi$ = this.name$.pipe(
      switchMap(name => this.eosService.getAbi(name))
    );
  }

  loadMore(sequence: number) {
    this.accountNewActions$ = this.name$.pipe(
      switchMap(name => this.eosService.getAccountActions(name, sequence))
    );
  }

}
