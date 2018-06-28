import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {EosService} from '../../services/eos.service';
import {AccountService} from '../../services/account.service';
import {VoteService} from '../../services/vote.service';
import {BpService} from '../../services/bp.service';
import {} from '@types/googlemaps';

@Component({
  selector: 'app-producer',
  templateUrl: './producer.component.html'
})
export class ProducerComponent implements OnInit {
  @ViewChild('gmap') gmapElement: any;
  map: google.maps.Map;

  public name: string;
  public account = null;
  public bpJson = null;
  public producer = null;
  public validated = false;
  public accountRaw = null;
  public votes = null;
  private subscriber: Subscription;
  page = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router, 
    private eosService: EosService,
    private accountService: AccountService,
    private voteService: VoteService,
    private bpService: BpService
  ) { }

  ngOnInit() {
    this.name = this.route.snapshot.params['id'];

    this.accountService.getAccount(this.name).subscribe(data => {
      this.account = data;
    });

    this.subscriber = this.route.queryParams.subscribe(params => {
      this.page = params['page'] || 0;
      
      this.voteService.getVote(this.name, this.page).subscribe(data => {
        this.votes = data;
      });
    });

    this.eosService.eos.getAccount(this.name).then(result => {
      this.accountRaw = result;
    });

    this.calculateReward(this.name);
  }

  calculateReward(producer) {
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
      let producers = result.rows;
      producers.sort(function(a,b) {return (parseFloat(a.total_votes) < parseFloat(b.total_votes)) ? 1 : ((parseFloat(b.total_votes) < parseFloat(a.total_votes)) ? -1 : 0);} )
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
        for (let index in producers) {
          let percentageVotes = (producers[index].total_votes / chainStatus.total_producer_vote_weight * 100);
          if (percentageVotes * 200 < 100) {
            votesToRemove += parseFloat(producers[index].total_votes);
          }
        }

        for (let index in producers) {
          if (producers[index].owner != producer) {
            continue;
          }

          let position: number = parseInt(index) + 1;
          let reward = 0;
          if (position < 22) {
            reward += 318;
          }
          let percentageVotes = (producers[index].total_votes / (chainStatus.total_producer_vote_weight) * 100);
          let percentageVotesRewarded = (producers[index].total_votes / (chainStatus.total_producer_vote_weight - votesToRemove) * 100);

          reward += percentageVotesRewarded * 200;

          if (percentageVotes * 200 < 100) {
            reward = 0;
          }

          this.producer = producers[index];
          this.producer.position = position;
          this.producer.reward = reward.toFixed(0);
          this.producer.votes = percentageVotes.toFixed(2);
          console.log(this.producer);
          
          this.bpService.getBP(this.producer.url).subscribe(data => {
            this.bpJson = data;

            if (this.bpJson && this.bpJson.nodes && this.bpJson.nodes[0].location) {
              let mapProp = {
                center: new google.maps.LatLng(this.bpJson.nodes[0].location.latitude, this.bpJson.nodes[0].location.longitude),
                zoom: 15,
                mapTypeId: google.maps.MapTypeId.ROADMAP
              };
              this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
            }

            console.log(this.bpJson);
            if (this.bpJson && this.producer
              && this.bpJson.producer_public_key == this.producer.producer_key
              && this.bpJson.producer_account_name == this.producer.owner
            ) {
              this.validated = true;
            }
          });

          if (producers[index].owner == producer) {
            break;
          }
        }

      });

    });
  }

  nextPage() {
    this.page++;
    this.router.navigate(['/producers/' + this.name], {queryParams: {page: this.page}});
  }

  prevPage() {
    this.page--;
    this.router.navigate(['/producers/' + this.name], {queryParams: {page: this.page}});
  }
}
