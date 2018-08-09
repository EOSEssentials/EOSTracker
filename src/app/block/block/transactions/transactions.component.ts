import { Component, OnInit, Input } from '@angular/core';
import { Transaction } from '../../../models';

@Component({
  selector: 'app-block-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {

  @Input() transactions: Transaction[];
  transactionsColumns = [
    'id',
    'blockId',
    'createdAt',
    'numActions'
  ];

  constructor() { }

  ngOnInit() {
  }

}
