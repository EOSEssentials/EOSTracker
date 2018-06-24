import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActionService } from '../../services/action.service';
import { Action } from '../../models/action';
import { Observable } from 'rxjs';
import { switchMap, map, share } from 'rxjs/operators';

@Component({
  templateUrl: './contracts1.component.html',
  styleUrls: ['./contracts1.component.css']
})
export class Contracts1Component implements OnInit {

  columnHeaders = [
    'actionId',
    'transactionId',
    'createdAt',
    'authorization',
    'handler',
    'name'
  ];
  actions$: Observable<Action[]>;

  constructor(
    private route: ActivatedRoute,
    private actionService: ActionService
  ) { }

  ngOnInit() {
    this.actions$ = this.route.queryParams.pipe(
      map(queryParams => queryParams.page ? Number(queryParams.page) : 1),
      switchMap(page => this.actionService.getActions(page)),
      share()
    );
  }

}
