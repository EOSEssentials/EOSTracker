import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppService } from '../../services/app.service';

@Component({
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {

  columnHeaders$: Observable<string[]> = of(DEFAULT_HEADERS);
  blocks$: Observable<any[]>;
  pageIndex = 0;
  pageSize = 10;
  total = 0;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private appService: AppService
  ) { }

  ngOnInit() {
    this.columnHeaders$ = this.breakpointObserver.observe(Breakpoints.XSmall).pipe(
      map(result => result.matches ? XSMALL_HEADERS : DEFAULT_HEADERS)
    );
    this.blocks$ = this.appService.getBlocks(this.pageIndex, this.pageSize).pipe(
      tap(blocks => {
        this.total = blocks[0].block_num;
      })
    );
  }

  onPaging(pageEvent) {
    this.pageIndex = pageEvent.pageIndex;
    this.blocks$ = this.appService.getBlocks(pageEvent.length - pageEvent.pageSize * pageEvent.pageIndex);
  }

}

const DEFAULT_HEADERS = [
  'id',
  'cpu',
  'net',
  'actions'
];

const XSMALL_HEADERS = [
  'id',
  'actions'
];
