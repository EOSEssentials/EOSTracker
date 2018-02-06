import {Component, OnInit} from '@angular/core';
import {TransactionService} from '../../services/transaction.service';
import {HttpClient} from '@angular/common/http';
import {Subscription} from 'rxjs/Subscription';
import {ActivatedRoute, Router} from '@angular/router';
import {environment} from '../../../environments/environment';

declare let jquery: any;
declare let $: any;

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {
  transactions = null;
  private subscriber: Subscription;
  page = 0;

  constructor(private transactionService: TransactionService, private http: HttpClient, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {

    this.subscriber = this.route.queryParams.subscribe(params => {
      this.page = params['page'] || 0;

      this.http.get(environment.apiUrl + '/transactions?page=' + this.page).subscribe(data => {
        this.transactions = data;
        console.log(data);
      });
    });
  }


  nextPage() {
    this.page++;
    this.router.navigate(['/transactions'], {queryParams: {page: this.page}});
  }

  prevPage() {
    this.page--;
    this.router.navigate(['/transactions'], {queryParams: {page: this.page}});
  }
}
