import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlockService } from '../../../services/block.service';
import { Transaction } from '../../../models/Transaction';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-block-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {

  @Input() id: number;
  blockTransactions$: Observable<Transaction[]>;
  transactionsColumns = [
    'id',
    'blockId',
    'createdAt',
    'numActions'
  ];

  constructor(
    private route: ActivatedRoute,
    private blockService: BlockService
  ) { }

  ngOnInit() {
    this.blockTransactions$ = this.route.queryParams.pipe(
      switchMap(queryParams => this.blockService.getBlockTransactions(this.id, queryParams.page))
    );
  }

}
