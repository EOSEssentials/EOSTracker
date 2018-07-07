import { Component, OnInit } from '@angular/core';
import { BlockService } from '../../../services/block.service';
import { Block } from '../../../models/Block';
import { Observable, timer } from 'rxjs';
import { switchMap, share } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard-blocks',
  templateUrl: './blocks.component.html',
  styleUrls: ['./blocks.component.scss']
})
export class BlocksComponent implements OnInit {

  blocks$: Observable<Block[]>;
  blocksColumns = [
    'blockNumber',
    'timestamp',
    'producer',
    'numTransactions'
  ];

  constructor(
    private blockService: BlockService
  ) { }

  ngOnInit() {
    this.blocks$ = timer(0, 5000).pipe(
      switchMap(() => this.blockService.getBlocks(undefined, 20)),
      share()
    );
  }

}
