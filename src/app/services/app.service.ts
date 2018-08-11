import { Injectable } from '@angular/core';
import { EosService } from './eos.service';
import { CmcService } from './cmc.service';
import { Observable, Subject, timer, from } from 'rxjs';
import { map, filter, share, withLatestFrom, switchMap } from 'rxjs/operators';

const EOS_QUOTE = 60000;
const RAM_QUOTE = 60000;

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private latestBlockNumberSource = new Subject<number>();

  latestBlockNumber$ = this.latestBlockNumberSource.asObservable();
  chainStatus$: Observable<any>;
  isMaintenance$: Observable<boolean>;
  eosQuote$: Observable<any>;
  ramQuote$: Observable<any>;

  constructor(
    private eosService: EosService,
    private cmcService: CmcService
  ) {
    this.chainStatus$ = this.eosService.getInfo().pipe(
      share()
    );
    this.isMaintenance$ = this.chainStatus$.pipe(
      withLatestFrom(this.latestBlockNumber$),
      map(([chainStatus, blockNumber]) => {
        return (chainStatus.head_block_num - blockNumber) > 600;
      }),
      share()
    );
    this.eosQuote$ = timer(0, EOS_QUOTE).pipe(
      switchMap(() => this.cmcService.getEOSTicker()),
      filter(ticker => !!ticker.data),
      map(ticker => ticker.data.quotes['USD']),
      share()
    );
    this.ramQuote$ = timer(0, RAM_QUOTE).pipe(
      switchMap(() => from(this.eosService.eos.getTableRows({
        json: true,
        code: "eosio",
        scope: "eosio",
        table: "rammarket"
      }))),
      filter((data: any) => data.rows && data.rows.length),
      map(data => data.rows[0]),
      map(data => {
        const base = Number(data.base.balance.replace('RAM', ''));
        const quote = Number(data.quote.balance.replace('EOS', ''));
        return {
          ...data,
          price: quote / base
        };
      }),
      share()
    );
  }

  setLatestBlockNumber(blockNumber: number) {
    if (blockNumber) {
      this.latestBlockNumberSource.next(blockNumber);
    }
  }

}
