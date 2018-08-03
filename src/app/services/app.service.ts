import { Injectable } from '@angular/core';
import { EosService } from './eos.service';
import { Observable, Subject } from 'rxjs';
import { map, share, withLatestFrom } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private latestBlockNumberSource = new Subject<number>();

  latestBlockNumber$ = this.latestBlockNumberSource.asObservable();
  chainStatus$: Observable<any>;
  isMaintenance$: Observable<boolean>;

  constructor(
    private eosService: EosService
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
  }

  setLatestBlockNumber(blockNumber: number) {
    if (blockNumber) {
      this.latestBlockNumberSource.next(blockNumber);
    }
  }

}
