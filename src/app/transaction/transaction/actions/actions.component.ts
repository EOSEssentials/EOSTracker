import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-transaction-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss']
})
export class ActionsComponent implements OnInit {

  @Input() transaction;
  actionsColumns = [
    'index',
    'account',
    'authorization',
    'name'
  ];

  constructor() { }

  ngOnInit() {
  }

}
