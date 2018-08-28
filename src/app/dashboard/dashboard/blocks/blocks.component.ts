import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AppService } from '../../../services/app.service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard-blocks',
  templateUrl: './blocks.component.html',
  styleUrls: ['./blocks.component.scss']
})
export class BlocksComponent implements OnInit {

  blocks$: Observable<any[]>;
  blocksColumns$ = of(BLOCKS_COLUMNS);

  constructor(
    private breakpointObserver: BreakpointObserver,
    private appService: AppService
  ) { }

  ngOnInit() {
    this.blocks$ = this.appService.recentBlocks$;
    this.blocksColumns$ = this.breakpointObserver.observe(Breakpoints.XSmall).pipe(
      map(result => result.matches ? BLOCKS_COLUMNS.filter(c => c !== 'timestamp') : BLOCKS_COLUMNS)
    );
  }

}

export const BLOCKS_COLUMNS = [
  'block_num',
  'timestamp',
  'producer',
  'transactions'
];
