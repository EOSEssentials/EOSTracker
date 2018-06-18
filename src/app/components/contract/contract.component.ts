import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {EosService} from '../../services/eos.service';

@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html'
})
export class ContractComponent implements OnInit {
  public id: string;
  public action = null;
  public actionRaw = null;

  constructor(private route: ActivatedRoute, private http: HttpClient, private eosService: EosService) {
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.http.get(environment.apiUrl + '/actions/' + this.id).subscribe(data => {
      this.action = data;
      console.log(this.action);

      this.eosService.eos.getBlock(this.action.blockId).then(result => {
        console.log(result);
        for (let index in result.transactions) {
            if (result.transactions[index].trx.id == this.action.transaction) {
              this.actionRaw = result.transactions[index];
              return;
            }
        }
      });

    });
  }
}
