import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { EosService } from '../../services/eos.service';
import { Observable, of, timer } from 'rxjs';
import { map, share, switchMap } from 'rxjs/operators';

@Component({
  templateUrl: './producers.component.html',
  styleUrls: ['./producers.component.scss']
})
export class ProducersComponent implements OnInit {

  columnHeaders$: Observable<string[]> = of(PRODUCERS_COLUMNS);
  producers$: Observable<any[]>;
  chainStatus$: Observable<any>;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private eosService: EosService
  ) { }

  ngOnInit() {
    this.columnHeaders$ = this.breakpointObserver.observe(Breakpoints.XSmall).pipe(
      map(result => result.matches ? PRODUCERS_COLUMNS.filter((c: any) => (c !== 'url' && c !== 'numVotes')) : PRODUCERS_COLUMNS)
    );
    this.chainStatus$ = timer(0, 60000).pipe(
      switchMap(() => this.eosService.getChainStatus()),
      share()
    );
    this.producers$ = this.chainStatus$.pipe(
      switchMap(chainStatus => this.eosService.getProducers().pipe(
        map(producers => {
          const votesToRemove = producers.reduce((acc, cur) => {
            const percentageVotes = cur.total_votes / chainStatus.total_producer_vote_weight * 100;
            if (percentageVotes * 200 < 100) {
              acc += parseFloat(cur.total_votes);
            }
            return acc;
          }, 0);
          return producers.map((producer, index) => {
            let position = parseInt(index) + 1;
            let reward = 0;
            let percentageVotes = producer.total_votes / chainStatus.total_producer_vote_weight * 100;
            let percentageVotesRewarded = producer.total_votes / (chainStatus.total_producer_vote_weight - votesToRemove) * 100;
            if (position < 22) {
              reward += 318;
            }
            reward += percentageVotesRewarded * 200;
            if (reward < 100) {
              reward = 0;
            }
            return {
              ...producer,
              position: position,
              reward: reward.toFixed(0),
              votes: percentageVotes.toFixed(2),
              numVotes: (producer.total_votes / this.calculateVoteWeight() / 10000).toFixed(0)
            }
          });
        })
      )),
      share()
    );
  }

  private calculateVoteWeight() {
    //time epoch:
    //https://github.com/EOSIO/eos/blob/master/contracts/eosiolib/time.hpp#L160
    //stake to vote
    //https://github.com/EOSIO/eos/blob/master/contracts/eosio.system/voting.cpp#L105-L109
    let timestamp_epoch: number = 946684800000;
    let dates_: number = (Date.now() / 1000) - (timestamp_epoch / 1000);
    let weight_: number = Math.floor(dates_ / (86400 * 7)) / 52;  //86400 = seconds per day 24*3600
    return Math.pow(2, weight_);
  }

}

export const PRODUCERS_COLUMNS = [
  'position',
  'owner',
  'url',
  'numVotes',
  'votes',
  'reward'
];