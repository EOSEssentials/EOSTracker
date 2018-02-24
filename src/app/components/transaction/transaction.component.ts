import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {environment} from '../../../environments/environment';
import * as Eos from 'eosjs';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {
  public id: string;
  public transaction = null;
  public transactionRaw = null;

  constructor(private route: ActivatedRoute, private http: HttpClient) {
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];

    let eos = Eos.Localnet({httpEndpoint: environment.blockchainUrl});
    eos.getTransaction(this.id).then(result => {
      this.transactionRaw = result;
    });

    this.http.get(environment.apiUrl + '/transactions?transaction_id=' + this.id).subscribe(data => {
      this.transaction = data[0];
      console.log(this.transaction);
    });
  }
}
