import { Component, OnChanges, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-account-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss']
})
export class ActionsComponent implements OnChanges {

  @Input() actions;
  @Input() newActions;
  @Output() onLoadMore = new EventEmitter<number>();
  actionsColumns = [
    'id',
    'blockId',
    'transactionId',
    'timestamp',
    'name'
  ];
  accountActionSequence = 0;

  constructor() { }

  ngOnChanges() {
    if (this.newActions && !this.newActions.isError) {
      this.actions.value = this.actions.value.concat(this.newActions.value);
      this.newActions = null;
    }
    if (this.actions && !this.actions.isError && this.actions.value.length) {
      this.accountActionSequence = this.actions.value[this.actions.value.length - 1].account_action_seq;
    }
  }

}
