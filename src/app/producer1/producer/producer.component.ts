import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, combineLatest, of } from 'rxjs';
import { map, switchMap, share } from 'rxjs/operators';
import { EosService } from '../../services/eos.service';
import { AccountService } from '../../services/account.service';
import { VoteService } from '../../services/vote.service';
import { BpService } from '../../services/bp.service';
import { Producer } from '../../models/Producer';

@Component({
  templateUrl: './producer.component.html',
  styleUrls: ['./producer.component.scss']
})
export class ProducerComponent implements OnInit {

  name$: Observable<string>;
  producer$: Observable<Producer>;

  constructor(
    private route: ActivatedRoute,
    private eosService: EosService,
    private accountService: AccountService,
    private voteService: VoteService,
    private bpService: BpService
  ) { }

  ngOnInit() {
    this.name$ = this.route.params.pipe(
      map(params => params.id)
    );
    this.producer$ = combineLatest(
      this.name$,
      this.eosService.getChainStatus(),
      this.eosService.getProducers(),
      this.name$.pipe(
        switchMap(name => this.accountService.getAccount(name)),
        switchMap(account => this.eosService.getAccount(account.name).pipe(
          map(accountRaw => ({ ...account, raw: accountRaw }))
        ))
      )
    ).pipe(
      map(([name, chainStatus, producers, account]) => {
        const producer = producers.find(producer => producer.owner === name);
        const index = producers.findIndex(producer => producer.owner === name);
        const votesToRemove = producers.reduce((acc, cur) => {
          const percentageVotes = cur.total_votes / chainStatus.total_producer_vote_weight * 100;
          if (percentageVotes * 200 < 100) {
            acc += parseFloat(cur.total_votes);
          }
          return acc;
        }, 0);
        let position = parseInt(index) + 1;
        let reward = 0;
        let percentageVotes = producer.total_votes / chainStatus.total_producer_vote_weight * 100;
        let percentageVotesRewarded = producer.total_votes / (chainStatus.total_producer_vote_weight - votesToRemove) * 100;
        if (position < 22) {
          reward += 318;
        }
        reward += percentageVotesRewarded * 200;
        if (percentageVotes * 200 < 100) {
          reward = 0;
        }
        return {
          ...producer,
          account: account,
          position: position,
          reward: reward.toFixed(0),
          votes: percentageVotes.toFixed(2)
        }
      }),
      switchMap(producer => {
        if (!producer.url) {
          return of(producer);
        } else {
          return this.bpService.getBP(producer.url).pipe(
            map(bpJson => ({
              ...producer,
              bpJson,
              location: bpJson && bpJson.nodes && bpJson.nodes[0] && bpJson.nodes[0].location,
              validated: bpJson && bpJson.producer_public_key === producer.producer_key && bpJson.producer_account_name === producer.owner
            }))
          );
        }
      }),
      share()
    );
  }

}
