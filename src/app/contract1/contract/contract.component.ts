import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EosService } from '../../services/eos.service';
import { ActionService } from '../../services/action.service';
import { Action } from '../../models/Action';
import { Observable, from } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

interface ActionRaw extends Action {
  raw: any;
}

@Component({
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.css']
})
export class ContractComponent implements OnInit {

  action$: Observable<ActionRaw>;

  constructor(
    private route: ActivatedRoute,
    private eosService: EosService,
    private actionService: ActionService
  ) { }

  ngOnInit() {
    this.action$ = this.route.params.pipe(
      switchMap(params => this.actionService.getAction(params.id)),
      switchMap(action => {
        return from(this.eosService.eos.getBlock(action.blockId)).pipe(
          map((block: any) => block.transactions.find(transaction => transaction.trx.id === action.transaction))
        );
      }, (action, actionRaw) => ({
        ...action,
        raw: actionRaw
      }))
    );
  }

}
