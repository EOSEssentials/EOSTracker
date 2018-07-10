import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-account-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss']
})
export class ActionsComponent implements OnInit {

  @Input() actions;
  actionsColumns = [
    'id',
    'account',
    'createdAt',
    'transaction',
    'name'
  ];

  constructor() { }

  ngOnInit() {
  }

}
