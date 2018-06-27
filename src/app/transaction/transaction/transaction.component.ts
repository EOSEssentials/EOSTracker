import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {EosService} from '../../services/eos.service';
import {Subscription} from 'rxjs';
import {TransactionService} from '../../services/transaction.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html'
})
export class TransactionComponent implements OnInit {
  public id: string;
  public transaction = null;
  public actions = null;
  public transactionRaw = null;
  private subscriber: Subscription;
  page = 1;

  constructor(
    private route: ActivatedRoute,
    private eosService: EosService,
    private transactionService: TransactionService
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];

    this.transactionService.getTransaction(this.id).subscribe(data => {
      this.transaction = data;
      console.log(this.transaction);

      this.subscriber = this.route.queryParams.subscribe(params => {
        this.page = params['page'] || 1;
        
        this.transactionService.getTransactionActions(this.id, this.page).subscribe(data => {
          this.actions = data;
          console.log(data);
        });
      });

      this.eosService.eos.getBlock(this.transaction.blockId).then(result => {
        for (let index in result.transactions) {
          if (result.transactions[index].trx.id == this.transaction.id) {
            this.transactionRaw = result.transactions[index];
            return;
          }
        }
      });

    });
  }
}
