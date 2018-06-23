import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {EosService} from '../../services/eos.service';
import {ActionService} from '../../services/action.service';

@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html'
})
export class ContractComponent implements OnInit {
  public id: string;
  public action = null;
  public actionRaw = null;

  constructor(
    private route: ActivatedRoute,
    private eosService: EosService,
    private actionService: ActionService
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.actionService.getAction(this.id).subscribe(data => {
      this.action = data;
      console.log(this.action);

      this.eosService.eos.getBlock(this.action.blockId).then(result => {
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
