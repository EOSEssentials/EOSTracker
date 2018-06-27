import {Component, OnInit} from '@angular/core';
import {TransactionService} from '../../services/transaction.service';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';

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
  page = 1;

  constructor(
    private transactionService: TransactionService, 
    private route: ActivatedRoute, 
    private router: Router
  ) { }

  ngOnInit() {

    this.subscriber = this.route.queryParams.subscribe(params => {
      this.page = params['page'] || 1;
      
      this.transactionService.getTransactions(this.page).subscribe(data => {
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
