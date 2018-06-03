import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {environment} from '../../../environments/environment';
import {EosService} from '../../services/eos.service';
import {Subscription} from 'rxjs/Subscription';

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

  constructor(private route: ActivatedRoute, private http: HttpClient, private eosService: EosService) {
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];

    this.http.get(environment.apiUrl + '/transactions/' + this.id).subscribe(data => {
      this.transaction = data;
      console.log(this.transaction);

      this.subscriber = this.route.queryParams.subscribe(params => {
        this.page = params['page'] || 1;

        this.http.get(environment.apiUrl + '/transactions/' + this.id + '/actions?' + 'page=' + this.page).subscribe(data => {
          this.actions = data;
          console.log(data);
        });
      });

    });

    /*this.eosService.eos.getTransaction(this.id).then(result => { TODO: not working
      this.transactionRaw = result;
    });*/
  }
}
