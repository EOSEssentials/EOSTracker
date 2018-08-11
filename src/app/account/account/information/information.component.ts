import { Component, OnChanges, Input } from '@angular/core';

@Component({
  selector: 'app-account-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss']
})
export class InformationComponent implements OnChanges {

  @Input() account;
  @Input() eosQuote;
  @Input() ramQuote;
  balance: {
    liquid: number;
    ram: number;
    cpu: number;
    net: number;
    total?: number;
  };

  constructor() { }

  ngOnChanges() {
    if (this.account && this.eosQuote && this.ramQuote) {
      this.balance = {
        liquid: this.account.core_liquid_balance ? Number(this.account.core_liquid_balance.replace('EOS', '')) : 0,
        ram: this.account.ram_quota * this.ramQuote.price,
        cpu: this.account.cpu_weight / 10000,
        net: this.account.net_weight / 10000
      };
      this.balance.total = this.balance.liquid + this.balance.ram + this.balance.cpu + this.balance.net;
    }
  }

}
