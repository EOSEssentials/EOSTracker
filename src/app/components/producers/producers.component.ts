import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {EosService} from '../../services/eos.service';
import {TimerObservable} from 'rxjs/observable/TimerObservable';

declare let jquery: any;
declare let $: any;

@Component({
  selector: 'app-producers',
  templateUrl: './producers.component.html',
  styleUrls: ['./producers.component.css']
})
export class ProducersComponent implements OnInit, OnDestroy {
  producers = null;
  chainPercentage: string = "0";
  private alive: boolean; // used to unsubscribe from the TimerObservable

  constructor(private http: HttpClient, private eosService: EosService) {
    this.alive = true;
  }

  ngOnInit() {

    TimerObservable.create(0, 60000)
      .takeWhile(() => this.alive)
      .subscribe(() => {


        this.eosService.eos.getTableRows(
          {
            json: true,
            code: "eosio",
            scope: "eosio",
            table: "producers",
            limit: 500,
            table_key: ""
          }
        ).then(result => {
          this.producers = result.rows;
          this.producers.sort(function (a, b) {
            return (parseFloat(a.total_votes) < parseFloat(b.total_votes)) ? 1 : ((parseFloat(b.total_votes) < parseFloat(a.total_votes)) ? -1 : 0);
          })
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
            let votesToRemove: number = 0;
            for (let index in this.producers) {
              let percentageVotes = (this.producers[index].total_votes / chainStatus.total_producer_vote_weight * 100);
              if (percentageVotes * 200 < 100) {
                votesToRemove += parseFloat(this.producers[index].total_votes);
              }
            }

            for (let index in this.producers) {
              let position: number = parseInt(index) + 1;
              let reward = 0;
              if (position < 22) {
                reward += 318;
              }
              let percentageVotes = (this.producers[index].total_votes / (chainStatus.total_producer_vote_weight) * 100);
              let percentageVotesRewarded = (this.producers[index].total_votes / (chainStatus.total_producer_vote_weight - votesToRemove) * 100);

              reward += percentageVotesRewarded * 200;

              if (percentageVotes * 200 < 100) {
                reward = 0;
              }

              this.producers[index].reward = reward.toFixed(0);
              this.producers[index].votes = percentageVotes.toFixed(2);
              this.producers[index].numVotes = (this.producers[index].total_votes / this.calculateVoteWeight() / 10000).toFixed(0);
            }

          });

        });

      });

    TimerObservable.create(0, 5000)
      .takeWhile(() => this.alive)
      .subscribe(() => {

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
          this.chainPercentage = (chainStatus.total_activated_stake  / 10000 / 1000011818 * 100).toFixed(2);
        });
      });

    /*
    this.http.get(environment.apiUrl + '/producers').subscribe(data => {
      this.producers = data;
      console.log(this.producers);

      let dataPie = [];

      for (let producer of this.producers) {
        dataPie.push({label: producer.name, data: producer.num})
      }

      $.plot($("#flot-pie-chart"), dataPie, {
        series: {
          pie: {
            show: true
          }
        },
        grid: {
          hoverable: true
        },
        tooltip: true,
        tooltipOpts: {
          content: "%p.0%, %s",
          shifts: {
            x: 20,
            y: 0
          },
          defaultTheme: false
        }
      });
    });

    */
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
