import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppService } from '../../services/app.service';

@Component({
  templateUrl: './blocks.component.html',
  styleUrls: ['./blocks.component.scss']
})
export class BlocksComponent implements OnInit {

  columnHeaders$: Observable<string[]> = of(BLOCK_COLUMNS);
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
      map(result => result.matches ? BLOCK_COLUMNS.filter(c => c !== 'timestamp') : BLOCK_COLUMNS)
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

export const BLOCK_COLUMNS = [
  'block_num',
  'timestamp',
  'producer',
  'transactions'
];
