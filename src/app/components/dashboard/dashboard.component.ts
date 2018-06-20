import {Component, OnDestroy, OnInit} from '@angular/core';
import {TimerObservable} from 'rxjs/observable/TimerObservable';
import 'rxjs/add/operator/takeWhile';
import {EosService} from '../../services/eos.service';
import {StatService} from '../../services/stat.service';
import {BlockService} from '../../services/block.service';
import {TransactionService} from '../../services/transaction.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit, OnDestroy {
  stats = [0, 0, 0, 0];
  blocks = null; // Block[]
  transactions = null; // Transaction[]

  private alive: boolean; // used to unsubscribe from the TimerObservable

  constructor(
    private eosService: EosService,
    private statService: StatService,
    private blockService: BlockService,
    private transactionService: TransactionService
  ) {
    this.alive = true;
  }

  ngOnInit() {
    TimerObservable.create(0, 5000)
      .takeWhile(() => this.alive)
      .subscribe(() => {

        this.statService.getStats().subscribe(data => {
          this.stats = data;
        });
      });

    // TODO: move from here and conver to objects https://medium.com/codingthesmartway-com-blog/angular-4-3-httpclient-accessing-rest-web-services-with-angular-2305b8fd654b
    TimerObservable.create(0, 5000)
      .takeWhile(() => this.alive)
      .subscribe(() => {

        this.blockService.getBlocks(undefined, 20).subscribe(data => {
          this.blocks = data;
        });
      });


    TimerObservable.create(0, 5000)
      .takeWhile(() => this.alive)
      .subscribe(() => {

        this.transactionService.getTransactions(undefined, 20).subscribe(data => {
          this.transactions = data;
        });
      });
  }

  ngOnDestroy() {
    this.alive = false;
  }

}
