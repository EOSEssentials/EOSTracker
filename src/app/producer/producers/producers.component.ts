import {Component, OnDestroy, OnInit} from '@angular/core';
import {EosService} from '../../services/eos.service';
import {timer} from 'rxjs';
import {takeWhile} from 'rxjs/operators';

declare let jquery: any;
declare let $: any;

@Component({
  selector: 'app-producers',
  templateUrl: './producers.component.html',
  styleUrls: ['./producers.component.scss']
})
export class ProducersComponent implements OnInit, OnDestroy {
  producers = null;
  chainPercentage: string = "0";
  chainNumber: number;
  private alive: boolean; // used to unsubscribe from the TimerObservable

  constructor(private eosService: EosService) {
    this.alive = true;
  }

  ngOnInit() {

    timer(0, 60000).pipe(
      takeWhile(() => this.alive)
    ).subscribe(() => {

      this.eosService.eos.getTableRows(
        {
          json: true,
          code: "eosio",
          scope: "eosio",
          table: "producers",
          limit: 700,
          table_key: ""
        }
      ).then(result => {
        console.log(result);
        this.producers = result.rows;
        this.producers.sort(function (a, b) {
          return (parseFloat(a.total_votes) < parseFloat(b.total_votes)) ? 1 : ((parseFloat(b.total_votes) < parseFloat(a.total_votes)) ? -1 : 0);
        });

        this.eosService.eos.getTableRows(
          {
            json: true,
            code: "eosio",
            scope: "eosio",
            table: "global",
            limit: 1
          }
        ).then(result => {
          let chainStatus = result.rows[0];

          for (let index in this.producers) {
            let position: number = parseInt(index) + 1;
            let reward = 0;
            if (position < 22) {
              reward += 318;
            }
            let percentageVotes = (this.producers[index].total_votes / (chainStatus.total_producer_vote_weight) * 100);
            let percentageVotesRewarded = (this.producers[index].total_votes / (chainStatus.total_producer_vote_weight) * 100);

            reward += percentageVotesRewarded * 200;

            if (reward < 100) {
              reward = 0;
            }

            this.producers[index].reward = reward.toFixed(0);
            this.producers[index].votes = percentageVotes.toFixed(2);
            this.producers[index].numVotes = (this.producers[index].total_votes / this.calculateVoteWeight() / 10000).toFixed(0);
          }

        });

      });

    });

    timer(0, 60000).pipe(
      takeWhile(() => this.alive)
    ).subscribe(() => {

      this.eosService.eos.getTableRows(
        {
          json: true,
          code: "eosio",
          scope: "eosio",
          table: "global",
          limit: 1
        }
      ).then(result => {
        let chainStatus = result.rows[0];
        this.chainPercentage = (chainStatus.total_activated_stake / 10000 / 1000011818 * 100).toFixed(2);
        this.chainNumber = (chainStatus.total_activated_stake / 1000011818 * 100000);
      });
    });
  }

  calculateVoteWeight() {

    //time epoch:
    //https://github.com/EOSIO/eos/blob/master/contracts/eosiolib/time.hpp#L160
    //stake to vote
    //https://github.com/EOSIO/eos/blob/master/contracts/eosio.system/voting.cpp#L105-L109
    let timestamp_epoch: number = 946684800000;
    let dates_: number = (Date.now() / 1000) - (timestamp_epoch / 1000);
    let weight_: number = Math.floor(dates_ / (86400 * 7)) / 52;  //86400 = seconds per day 24*3600
    return Math.pow(2, weight_);
  }

  ngOnDestroy() {
    this.alive = false;
  }

}
