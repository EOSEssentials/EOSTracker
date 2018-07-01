import {Injectable} from '@angular/core';
import * as Eos from 'eosjs';
import {LocalStorage} from 'ngx-webstorage';

@Injectable()
export class ScatterService {
  @LocalStorage()
  identity: any;
  eos: any;
  scatter: any;
  network: any;

  load() {
    this.scatter = (<any>window).scatter;

    this.network = {
      blockchain: 'eos',
      host: 'api1.eosdublin.io',
      port: 443,
      chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906'
    };
    if (this.scatter) {
      this.eos = this.scatter.eos(this.network, Eos, {chainId: this.network.chainId}, 'https');
    }

  }

  login() {
    this.load();
    const requirements = {accounts: [this.network]};
    if (!this.scatter) {
      alert("You need to install Scatter to use the form.");
      return;
    }
    return this.scatter.getIdentity(requirements);
  }

  logout() {
    this.scatter.forgetIdentity();
  }

  isLoggedIn() {
    return this.scatter && !!this.scatter.identity;
  }

  accountName() {
    if (!this.scatter || !this.scatter.identity) {
      return;
    }
    const account = this.scatter.identity.accounts.find(acc => acc.blockchain === 'eos');
    return account.name;
  }

  support(amount: string) {
    this.load();
    const account = this.scatter.identity.accounts.find(acc => acc.blockchain === 'eos');
    return this.eos.transfer(account.name, 'trackeraegis', amount + " EOS", 'Aegis Support');
  }

  refund() {
    this.load();
    const account = this.scatter.identity.accounts.find(acc => acc.blockchain === 'eos');
    const options = {authorization: [`${account.name}@${account.authority}`]};
    return this.eos.contract('trackeraegis').then(contract => contract.refund(account.name, options));
  }
}
