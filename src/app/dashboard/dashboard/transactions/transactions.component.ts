import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppService } from '../../../services/app.service';

@Component({
  selector: 'app-dashboard-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {

  columnHeaders$: Observable<string[]> = of(DEFAULT_HEADERS);
  transactions$;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private appService: AppService
  ) { }

  ngOnInit() {
    this.columnHeaders$ = this.breakpointObserver.observe(Breakpoints.XSmall).pipe(
      map(result => result.matches ? XSMALL_HEADERS : DEFAULT_HEADERS)
    );
    this.transactions$ = this.appService.recentTransactions$.pipe(
      map(transactions => transactions.slice(0, 50))
    );
  }

}

const DEFAULT_HEADERS = [
  'id',
  'block_num',
  'cpu',
  'net',
  'actions'
];

const XSMALL_HEADERS = [
  'id',
  'block_num',
  'actions'
];
