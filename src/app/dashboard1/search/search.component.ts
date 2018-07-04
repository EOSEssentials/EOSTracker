import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { TransactionService } from '../../services/transaction.service';
import { BlockService } from '../../services/block.service';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  query$: Observable<string>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private transactionService: TransactionService,
    private blockService: BlockService,
    private accountService: AccountService
  ) { }

  ngOnInit() {
    this.query$ = this.route.queryParams.pipe(
      map(queryParams => queryParams.q)
    );
    this.subscription = this.query$.subscribe(query => {
      const blockNumber = Number(query);
      if (!isNaN(blockNumber)) {
        // if query is number, navigate to block
        this.router.navigate(['../blocks', blockNumber], { relativeTo: this.route, replaceUrl: true });
      } else if (query.length === 64) {
        // if query is string of length 64
        this.transactionService.getTransaction(query).subscribe(data => {
          if (data) {
            this.router.navigate(['../transactions', query], { relativeTo: this.route, replaceUrl: true });
          }
        });
        this.blockService.getBlockId(query).subscribe(data => {
          if (data) {
            this.router.navigate(['../blocks', data['blockNumber']], { relativeTo: this.route, replaceUrl: true });
          }
        });
      } else if (query.length === 53) {
        // if query is string of length 53
        this.accountService.getAccountKey(query).subscribe(data => {
          if (data) {
            this.router.navigate(['../accounts', data['name']], { relativeTo: this.route, replaceUrl: true });
          }
        });
      } else {
        this.accountService.getAccount(query).subscribe(data => {
          if (data) {
            this.router.navigate(['../accounts', query], { relativeTo: this.route, replaceUrl: true });
          }
        });
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
