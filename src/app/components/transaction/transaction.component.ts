import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {environment} from '../../../environments/environment';
import {EosService} from '../../services/eos.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html'
})
export class TransactionComponent implements OnInit {
  public id: string;
  public transaction = null;
  public transactionRaw = null;

  constructor(private route: ActivatedRoute, private http: HttpClient, private eosService: EosService) {
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];

    this.http.get(environment.apiUrl + '/transactions/' + this.id).subscribe(data => {
      this.transaction = data;
      console.log(this.transaction);
    });

    this.eosService.eos.getTransaction(this.id).then(result => {
      this.transactionRaw = result;
    });
  }
}
