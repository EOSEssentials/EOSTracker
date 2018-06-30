import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ActionService } from '../../services/action.service';
import { Action } from '../../models/Action';
import { Observable, of } from 'rxjs';
import { switchMap, map, share } from 'rxjs/operators';

@Component({
  templateUrl: './contracts.component.html',
  styleUrls: ['./contracts.component.css']
})
export class ContractsComponent implements OnInit {

  columnHeaders$: Observable<string[]> = of(CONTRACT_COLUMNS);
  actions$: Observable<Action[]>;

  constructor(
    private route: ActivatedRoute,
    private breakpointObserver: BreakpointObserver,
    private actionService: ActionService
  ) { }

  ngOnInit() {
    this.columnHeaders$ = this.breakpointObserver.observe(Breakpoints.XSmall).pipe(
      map(result => result.matches ? CONTRACT_COLUMNS.filter(c => c !== 'transactionId') : CONTRACT_COLUMNS)
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
