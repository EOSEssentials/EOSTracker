import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {AccountService} from '../../services/account.service';
import {CmcService} from '../../services/cmc.service';
import {EosService} from '../../services/eos.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  public name: string;
  public tables = null;
  public account = null;
  public accountRaw = null;
  public balance = null;
  public tokens = [];
  public actionsSent = null;
  public actionsReceived = null;
  public ramPrice = null;
  public eosPrice = null;
  private subscriber: Subscription;
  page = 1;

  constructor(
    private route: ActivatedRoute,
    private router: Router, 
    private eosService: EosService,
    private accountService: AccountService,
    private cmcService: CmcService
  ) { }

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.page = 1;
      this.actionsSent = null;
      this.actionsReceived = null;
      this.accountRaw = null;
      this.account = null;
      this.tables = null;
      this.name = params['id'];

      this.accountService.getAccount(this.name).subscribe(data => {
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

      this.accountService.getTokens().subscribe(data => {
        data.forEach((item, index) => {
          this.eosService.eos.getCurrencyBalance(data[index].account, this.name, data[index].symbol).then(result => {
            if (data[index].symbol !== 'EOS' && result && result[0]) {
                this.tokens.push(result[0]);
            }
          });
        });
      });

      this.cmcService.getEOSTicker().subscribe(result => {
        if (result['data']) {
          this.eosPrice = result['data'].quotes.USD.price;
        }
      });

      this.subscriber = this.route.queryParams.subscribe(params => {
        this.page = params['page'] || 1;

        this.accountService.getAccountActionsSent(this.name, this.page).subscribe(data => {
          data = (data[0]) ? data : [];
          this.actionsSent = data;
        });

        this.accountService.getAccountActionsReceived(this.name, this.page).subscribe(data => {
          data = (data[0]) ? data : [];
          this.actionsReceived = data;
        });
      });
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
