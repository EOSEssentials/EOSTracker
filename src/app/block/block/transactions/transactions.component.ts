import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-block-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {

  @Input() block;
  transactionsColumns = [
    'index',
    'id',
    'status',
    'cpu',
    'net',
    'actions'
  ];

  constructor() { }

  ngOnInit() {
  }

}
