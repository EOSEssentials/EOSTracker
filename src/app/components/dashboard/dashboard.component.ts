import {Component, OnDestroy, OnInit} from '@angular/core';
import {DashboardService} from '../../services/dashboard.service';
import {BlockService} from '../../services/block.service';
import {TransactionService} from '../../services/transaction.service';
import {HttpClient} from '@angular/common/http';
import {TimerObservable} from 'rxjs/observable/TimerObservable';
import 'rxjs/add/operator/takeWhile';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit, OnDestroy {
  stats = [0, 0, 0, 0];
  blocks = null; // Block[]
  transactions = null; // Transaction[]

  private alive: boolean; // used to unsubscribe from the TimerObservable

  constructor(private dashboardService: DashboardService, private blockService: BlockService, private transactionService: TransactionService, private http: HttpClient) {
    this.alive = true;
  }

  ngOnInit() {
    TimerObservable.create(0, 2000)
      .takeWhile(() => this.alive)
      .subscribe(() => {

        this.http.get(environment.apiUrl + '/stats').subscribe(data => {
          this.stats = <number[]>data;
        });
      });

    // TODO: move from here and conver to objects https://medium.com/codingthesmartway-com-blog/angular-4-3-httpclient-accessing-rest-web-services-with-angular-2305b8fd654b
    TimerObservable.create(0, 2000)
      .takeWhile(() => this.alive)
      .subscribe(() => {

        this.http.get(environment.apiUrl + '/blocks?size=20').subscribe(data => {
          this.blocks = data;
        });
      });


    TimerObservable.create(0, 2000)
      .takeWhile(() => this.alive)
      .subscribe(() => {

        this.http.get(environment.apiUrl + '/transactions?size=20').subscribe(data => {
          this.transactions = data;
        });
      });
  }

  ngOnDestroy() {
    this.alive = false;
  }

}
