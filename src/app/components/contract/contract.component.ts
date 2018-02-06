import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.css']
})
export class ContractComponent implements OnInit {
  public id: string;
  public index: number = 0;
  public message = null;

  constructor(private route: ActivatedRoute, private http: HttpClient) {
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.index = this.route.snapshot.params['index'];
    this.http.get(environment.apiUrl + '/messages?transaction_id=' + this.id + '&msg_id=' + this.index).subscribe(data => {
      this.message = data[0];
      console.log(this.message);
    });
  }
}
