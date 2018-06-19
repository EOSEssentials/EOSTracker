import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {environment} from '../../../environments/environment';
import {Subscription} from 'rxjs/Subscription';
import {EosService} from '../../services/eos.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  public name: number;
  public tables = null;
  public account = null;
  public accountRaw = null;
  public balance = null;
  public actions = null;
  public ramPrice = null;
  private subscriber: Subscription;
  page = 1;

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router, private eosService: EosService) {
  }

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.page = 1;
      this.actions = null;
      this.accountRaw = null;
      this.account = null;
      this.tables = null;
      this.name = params['id'];

      this.http.get(environment.apiUrl + '/accounts/' + this.name).subscribe(data => {
        this.account = data;
        if (this.account.abi && this.account.abi.tables) {
          this.tables = this.account.abi.tables;

          this.tables.forEach((item, index) => {
            this.eosService.eos.getTableRows(true, this.name, this.name, item.name, item.key_names[0]).then(result => {
              this.tables[index].rows = result.rows; // TODO: allow pagination
            });
          });
        }
      });

      this.eosService.eos.getAccount(this.name).then(result => {
        this.accountRaw = result;
        console.log(result);
      });

      this.eosService.eos.getTableRows(
        {
          json: true,
          code: "eosio",
          scope: "eosio",
          table: "rammarket",
          limit: 1
        }
      ).then(result => {
          let base = parseFloat(result.rows[0].base.balance.replace(' RAM', ''));
          let quote = parseFloat(result.rows[0].quote.balance.replace(' EOS', ''));
          this.ramPrice = quote / base;
      });

      this.eosService.eos.getCurrencyBalance('eosio.token', this.name, 'EOS').then(result => {
        this.balance = 0;
        if (result && result[0]) {
          this.balance = parseFloat(result[0].replace(' EOS', ''));
        }
      });

      this.subscriber = this.route.queryParams.subscribe(params => {
        this.page = params['page'] || 1;

        this.http.get(environment.apiUrl + '/accounts/' + this.name + '/actions?page=' + this.page).subscribe(data => {
          this.actions = data;
        });
      });
    });
    //this.name = this.route.snapshot.params['id'];
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
