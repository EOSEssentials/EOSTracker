import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { AppService } from '../../../services/app.service';

@Component({
  selector: 'app-dashboard-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {

  transactionsColumns = [
    'id',
    'block_num',
    'cpu',
    'net',
    'actions'
  ];
  transactions$;

  constructor(
    private appService: AppService
  ) { }

  ngOnInit() {
    this.transactions$ = this.appService.recentTransactions$.pipe(
      map(transactions => transactions.slice(0, 50))
    );
  }

}
