import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AppService } from '../../../services/app.service';
import { BlockService } from '../../../services/block.service';
import { Block } from '../../../models/Block';
import { Observable, timer, of } from 'rxjs';
import { switchMap, share, map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard-blocks',
  templateUrl: './blocks.component.html',
  styleUrls: ['./blocks.component.scss']
})
export class BlocksComponent implements OnInit {

  blocks$: Observable<Block[]>;
  blocksColumns$ = of(BLOCKS_COLUMNS);

  constructor(
    private breakpointObserver: BreakpointObserver,
    private appService: AppService,
    private blockService: BlockService
  ) { }

  ngOnInit() {
    this.blocksColumns$ = this.breakpointObserver.observe(Breakpoints.XSmall).pipe(
      map(result => result.matches ? BLOCKS_COLUMNS.filter(c => c !== 'timestamp') : BLOCKS_COLUMNS)
    );
    this.blocks$ = timer(0, 5000).pipe(
      switchMap(() => this.blockService.getBlocks(undefined, 20)),
      share(),
      tap(blocks => {
        if (blocks.length) {
          this.appService.setLatestBlockNumber(blocks[0].blockNumber);
        }
      })
    );
  }

}

export const BLOCKS_COLUMNS = [
  'blockNumber',
  'timestamp',
  'producer',
  'numTransactions'
];
