import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { VoteService } from '../../../services/vote.service';
import { Vote } from '../../../models/Vote';

@Component({
  selector: 'app-producer-votes',
  templateUrl: './votes.component.html',
  styleUrls: ['./votes.component.scss']
})
export class VotesComponent implements OnInit {

  @Input() name;
  columnHeaders = [
    'account',
    'staked',
    'votes'
  ];
  votes$: Observable<Vote>;

  constructor(
    private route: ActivatedRoute,
    private voteService: VoteService
  ) { }

  ngOnInit() {
    this.votes$ = this.route.queryParams.pipe(
      map(queryParams => queryParams.page || 0),
      switchMap(page => this.voteService.getVote(this.name, page))
    );
  }

}
