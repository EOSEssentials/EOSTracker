import {Component, OnInit} from '@angular/core';
import {EosService} from '../services/eos.service';
import {ScatterService} from '../services/scatter.service';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.css']
})
export class SupportComponent implements OnInit {
  public history = null;
  public patrons = null;
  public info = null;
  public amount = null;

  constructor(private eosService: EosService, private scatterService: ScatterService) {
  }

  ngOnInit() {
    this.scatterService.load();
    this.eosService.eos.getTableRows(
      {
        json: true,
        code: "trackeraegis",
        scope: "trackeraegis",
        table: "history",
        limit: 500
      }
    ).then(result => {
      this.history = result.rows.sort(this.compare);
    });

    this.eosService.eos.getTableRows(
      {
        json: true,
        code: "trackeraegis",
        scope: "trackeraegis",
        table: "patrons",
        limit: 500
      }
    ).then(result => {
      this.patrons = result.rows.sort(this.compare);
    });

    this.eosService.eos.getTableRows(
      {
        json: true,
        code: "trackeraegis",
        scope: "trackeraegis",
        table: "global",
        limit: 1
      }
    ).then(result => {
      this.info = result.rows[0];
    });

  }

  isLogged() { return this.scatterService.isLoggedIn(); }
  refund() { return this.scatterService.refund(); }
  support(amount: string) { this.scatterService.support(amount); }
  login() { this.scatterService.login(); }


  private compare(a, b) {
    if (a.balance > b.balance) {
      return -1;
    }
    if (a.balance < b.balance) {
      return 1;
    }
    return 0;
  }
}
