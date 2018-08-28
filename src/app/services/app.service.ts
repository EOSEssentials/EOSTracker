import { Injectable } from '@angular/core';
import { EosService } from './eos.service';
import { CmcService } from './cmc.service';
import { Observable, Subject, timer, from, forkJoin } from 'rxjs';
import { map, filter, share, withLatestFrom, switchMap } from 'rxjs/operators';

const EOS_QUOTE = 60000;
const RAM_QUOTE = 60000;
const GET_INFO_INTERVAL = 5000;

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private latestBlockNumberSource = new Subject<number>();

  latestBlockNumber$ = this.latestBlockNumberSource.asObservable();
  isMaintenance$: Observable<boolean>;
  eosQuote$: Observable<any>;
  ramQuote$: Observable<any>;
  info$: Observable<any>;
  latestBlock$: Observable<any>;
  recentBlocks$: Observable<any[]>;
  recentTransactions$: Observable<any[]>;

  constructor(
    private eosService: EosService,
    private cmcService: CmcService
  ) {
    this.info$ = timer(0, GET_INFO_INTERVAL).pipe(
      switchMap(() => this.eosService.getDeferInfo()),
      share()
    );
    this.latestBlock$ = this.info$.pipe(
      switchMap((info: any) => from(this.eosService.getDeferBlock(info.head_block_num))),
      share()
    );
    this.recentBlocks$ = this.latestBlock$.pipe(
      switchMap((block: any) => {
        const blockNumber: number = block.block_num;
        const blockNumbers: number[] = [blockNumber - 1, blockNumber - 2, blockNumber - 3, blockNumber - 4];
        const blockNumbers$: Observable<any>[] = blockNumbers.map(blockNum => from(this.eosService.getDeferBlock(blockNum)));
        return forkJoin(blockNumbers$).pipe(
          map((blocks) => [block, ...blocks])
        );
      }),
      share()
    );
    this.recentTransactions$ = this.recentBlocks$.pipe(
      map((blocks: any[]) => {
        return blocks.reduce((previous, current) => {
          const transactions = current.transactions.map(transaction => {
            return {
              ...transaction,
              block_num: current.block_num,
              trx: typeof transaction.trx === 'string' ? { id: transaction.trx } : transaction.trx
            };
          })
          return previous.concat(transactions);
        }, []);
      }),
      share()
    );
    this.isMaintenance$ = this.info$.pipe(
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
