import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {environment} from '../../../environments/environment';
import {Subscription} from 'rxjs/Subscription';
import {EosService} from '../../services/eos.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html'
})
export class AccountComponent implements OnInit {

  public name: number;
  public tables = null;
  public account = null;
  public accountRaw = null;
  public transactions = null;
  private subscriber: Subscription;
  page = 0;

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router, private eosService: EosService) {
  }

  ngOnInit() {
    this.name = this.route.snapshot.params['id'];
    this.http.get(environment.apiUrl + '/accounts?name=' + this.name).subscribe(data => {
      this.account = data[0];
      console.log(this.account);
      if (this.account.abi && this.account.abi.tables) {
        this.tables = this.account.abi.tables;

        this.tables.forEach((item, index) => {
            this.eosService.eos.getTableRows(true, this.name, this.name, item.name, item.key_names[0]).then(result => {
            console.log(result.rows);
            this.tables[index].rows = result.rows; // TODO: allow pagination
          });
        });
      }
    });

    this.subscriber = this.route.queryParams.subscribe(params => {
      this.page = params['page'] || 0;

      this.http.get(environment.apiUrl + '/transactions?scope=' + this.name + '&page=' + this.page).subscribe(data => {
        this.transactions = data;
        console.log(data);
      });
    });

    this.eosService.eos.getAccount(this.name).then(result => {
      this.accountRaw = result;
    });
  }

  nextPage() {
    this.page++;
    this.router.navigate(['/accounts/' + this.name], {queryParams: {page: this.page}});
  }

  prevPage() {
    this.page--;
    this.router.navigate(['/accounts/' + this.name], {queryParams: {page: this.page}});
  }
}
