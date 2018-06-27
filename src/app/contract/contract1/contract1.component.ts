import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EosService } from '../../services/eos.service';
import { ActionService } from '../../services/action.service';
import { Action } from '../../models/action';
import { Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

interface ActionRaw extends Action {
  raw: any;
}

@Component({
  selector: 'app-contract1',
  templateUrl: './contract1.component.html',
  styleUrls: ['./contract1.component.css']
})
export class Contract1Component implements OnInit {

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
        return Observable.from(this.eosService.eos.getBlock(action.blockId)).pipe(
          map((block: any) => block.transactions.find(transaction => transaction.trx.id === action.transaction))
        );
      }, (action, actionRaw) => ({
        ...action,
        raw: actionRaw
      }))
    );
  }

}
