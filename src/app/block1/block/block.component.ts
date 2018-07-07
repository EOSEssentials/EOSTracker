import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EosService } from '../../services/eos.service';
import { BlockService } from '../../services/block.service';
import { Block } from '../../models/Block';
import { Transaction } from '../../models/Transaction';
import { Observable, combineLatest, from } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

@Component({
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.scss']
})
export class BlockComponent implements OnInit {

  id$: Observable<number>;
  block$: Observable<Block>;
  blockRaw$: Observable<any>;
  blockTransactions$: Observable<Transaction[]>;
  transactionsColumns = [
    'id',
    'blockId',
    'createdAt',
    'numActions'
  ];

  constructor(
    private route: ActivatedRoute,
    private eosService: EosService,
    private blockService: BlockService
  ) { }

  ngOnInit() {
    this.id$ = this.route.params.pipe(
      map(params => Number(params.id))
    );
    this.block$ = this.id$.pipe(
      switchMap(id => this.blockService.getBlock(id))
    );
    this.blockTransactions$ = combineLatest(
      this.id$,
      this.route.queryParams
    ).pipe(
      switchMap(([id, queryParams]) => {
        return this.blockService.getBlockTransactions(id, queryParams.page);
      })
    );
    this.blockRaw$ = this.id$.pipe(
      switchMap(id => from(this.eosService.eos.getBlock(id)))
    );
  }

}
