import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {
  public id: string;
  public transaction = null;

  constructor(private route: ActivatedRoute, private http: HttpClient) {
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.http.get(environment.apiUrl + '/transactions?transaction_id=' + this.id).subscribe(data => {
      this.transaction = data[0];
      console.log(this.transaction);
    });
  }
}
