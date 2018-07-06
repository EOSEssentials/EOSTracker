import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, combineLatest } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { EosService } from '../../services/eos.service';
import { AccountService } from '../../services/account.service';
import { VoteService } from '../../services/vote.service';
import { BpService } from '../../services/bp.service';
import { Account } from '../../models/Account';
import { Producer } from '../../models/Producer';
import { Vote } from '../../models/Vote';

interface AccountRaw extends Account {
  raw: any;
}

@Component({
  selector: 'app-producer',
  templateUrl: './producer.component.html',
  styleUrls: ['./producer.component.css']
})
export class ProducerComponent implements OnInit {

  name$: Observable<string>;
  account$: Observable<AccountRaw>;
  producer$: Observable<Producer>;
  votes$: Observable<Vote>;

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
    this.account$ = this.name$.pipe(
      switchMap(name => this.accountService.getAccount(name)),
      switchMap(account => this.eosService.getAccount(account.name).pipe(
        map(accountRaw => ({ ...account, raw: accountRaw }))
      ))
    );
    this.votes$ = combineLatest(
      this.name$,
      this.route.queryParams.pipe(map(queryParams => queryParams.page || 0))
    ).pipe(
      switchMap(([name, page]) => this.voteService.getVote(name, page))
    );
    this.producer$ = combineLatest(
      this.name$,
      this.eosService.getChainStatus(),
      this.eosService.getProducers()
    ).pipe(
      map(([name, chainStatus, producers]) => {
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
          position: position,
          reward: reward.toFixed(0),
          votes: percentageVotes.toFixed(2)
        }
      }),
      switchMap(producer => this.bpService.getBP(producer.url).pipe(
        map(bpJson => {
          return {
            ...producer,
            bpJson,
            location: bpJson && bpJson.nodes && bpJson.nodes[0] && bpJson.nodes[0].location,
            validated: bpJson && bpJson.producer_public_key === producer.producer_key && bpJson.producer_account_name === producer.owner
          };
        })
      )),
      tap(x => console.log(x))
    );
  }

}
