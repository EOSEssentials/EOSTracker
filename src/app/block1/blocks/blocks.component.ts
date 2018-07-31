import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { BlockService } from '../../services/block.service';
import { Block } from '../../models/Block';
import { Observable, of } from 'rxjs';
import { switchMap, map, share } from 'rxjs/operators';

@Component({
  templateUrl: './blocks.component.html',
  styleUrls: ['./blocks.component.scss']
})
export class BlocksComponent implements OnInit {

  columnHeaders$: Observable<string[]> = of(BLOCK_COLUMNS);
  blocks$: Observable<Block[]>;

  constructor(
    private route: ActivatedRoute,
    private breakpointObserver: BreakpointObserver,
    private blockService: BlockService
  ) { }

  ngOnInit() {
    this.columnHeaders$ = this.breakpointObserver.observe(Breakpoints.XSmall).pipe(
      map(result => result.matches ? BLOCK_COLUMNS.filter(c => c !== 'timestamp') : BLOCK_COLUMNS)
    );
    this.blocks$ = this.route.queryParams.pipe(
      map(queryParams => queryParams.page ? Number(queryParams.page) : 1),
      switchMap(page => this.blockService.getBlocks(page)),
      share()
    );
  }

}

export const BLOCK_COLUMNS = [
  'blockNumber',
  'timestamp',
  'irreversible',
  'producer',
  'numTransactions',
  'confirmed'
];
