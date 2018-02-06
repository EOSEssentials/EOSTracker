import {Component, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {TimerObservable} from 'rxjs/observable/TimerObservable';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit, OnDestroy {
  private scatter: any;
  private eos: any;
  private identity: any;
  private transactions = null;
  private page = 0;
  private alive: boolean;
  private account = null;

  constructor(private renderer: Renderer2, private http: HttpClient) {
    this.alive = true;
    renderer.listen('document', 'scatterLoaded', () => {
        this.loadScatter();
      }
    );
  }

  ngOnInit() {
    if ((<any>window).scatter) {
      this.loadScatter();
    }
  }

  loadScatter() {
    this.scatter = (<any>window).scatter;
    let Network = function (name, host, port) {
      this.name = name;
      this.host = host;
      this.port = port;
    };
    Network.prototype.toEndpoint = function () {
      return `http://${this.host}:${this.port}`
    };

    let network = new Network('Testnet', 'testnet1.eos.io', 80);
    this.scatter.setNetwork(network);
    this.eos = (<any>window).Eos.Localnet({httpEndpoint: network.toEndpoint(), signProvider: this.scatter.provider});
    let that = this;
    this.scatter.requestIdentity().then(
      function (identity) {
        that.identity = identity;

        TimerObservable.create(0, 3000)
          .takeWhile(() => that.alive)
          .subscribe(() => {

            that.http.get(environment.apiUrl + '/transactions?scope=' + that.identity.name + '&page=' + that.page).subscribe(data => {
              that.transactions = data;
              console.log(data);
            });

            that.http.get(environment.apiUrl + '/accounts?name=' + identity.name).subscribe(data => {
              that.account = data[0];
              console.log(that.account)
            });
          });
      }
    ).catch(e => {
      console.log(e)
    });
  }

  transfer(to: string, amount: number) {

    let trx = {
      messages: [{
        code: 'eos',
        type: 'transfer',
        authorization: [],
        data: {
          from: this.identity.name,
          to: to,
          amount: amount * 10000,
          memo: ''
        }
      }],
      scope: [to],
      signatures: []
    };

    this.scatter.signWithAnyAccount(trx).then(transaction => {
      console.log(transaction);
    }).catch(e => {
      console.log(e)
    });
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
