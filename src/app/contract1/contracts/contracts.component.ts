import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MediaService } from '@angular/flex-layout';
import { ActionService } from '../../services/action.service';
import { Action } from '../../models/Action';
import { Observable, of } from 'rxjs';
import { switchMap, map, share, distinctUntilChanged } from 'rxjs/operators';

@Component({
  templateUrl: './contracts.component.html',
  styleUrls: ['./contracts.component.css']
})
export class ContractsComponent implements OnInit {

  columnHeaders$: Observable<string[]> = of(CONTRACT_COLUMNS);
  actions$: Observable<Action[]>;

  constructor(
    private route: ActivatedRoute,
    private mediaService: MediaService,
    private actionService: ActionService
  ) { }

  ngOnInit() {
    this.columnHeaders$ = this.mediaService.asObservable().pipe(
      map(media => media.mqAlias),
      distinctUntilChanged(),
      map(mqAlias => mqAlias === 'xs' ? CONTRACT_COLUMNS.filter(c => c !== 'transactionId') : CONTRACT_COLUMNS)
    );
    this.actions$ = this.route.queryParams.pipe(
      map(queryParams => queryParams.page ? Number(queryParams.page) : 1),
      switchMap(page => this.actionService.getActions(page)),
      share()
    );
  }

}

export const CONTRACT_COLUMNS = [
  'actionId',
  'transactionId',
  'createdAt',
  'authorization',
  'handler',
  'name'
];
