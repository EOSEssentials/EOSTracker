import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EosService } from '../../services/eos.service';
import { ActionService } from '../../services/action.service';
import { Action } from '../../models/Action';
import { Observable, from, combineLatest } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

interface ActionRaw extends Action {
  raw: any;
}

@Component({
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.scss']
})
export class ContractComponent implements OnInit {

  action$: Observable<ActionRaw>;

  constructor(
    private route: ActivatedRoute,
    private eosService: EosService,
    private actionService: ActionService
  ) { }

  ngOnInit() {
    this.action$ = combineLatest(
      this.route.params,
      this.route.queryParams
    ).pipe(
      switchMap(([params, queryParams]) => {
        if (params.id) {
          return this.actionService.getAction(params.id);
        } else {
          return this.actionService.getActionSeq(params.trxId, params.seq, queryParams.parentId);
        }
      }),
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
