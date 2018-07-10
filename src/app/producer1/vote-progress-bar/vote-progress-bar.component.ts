import { Component, OnChanges, Input } from '@angular/core';

@Component({
  selector: 'app-vote-progress-bar',
  templateUrl: './vote-progress-bar.component.html',
  styleUrls: ['./vote-progress-bar.component.scss']
})
export class VoteProgressBarComponent implements OnChanges {

  @Input() chainStatus;
  chainPercentage;
  chainNumber;

  constructor() { }

  ngOnChanges() {
    if (this.chainStatus) {
      this.chainPercentage = (this.chainStatus.total_activated_stake / 10000 / 1000011818 * 100).toFixed(2);
      this.chainNumber = (this.chainStatus.total_activated_stake / 1000011818 * 100000);
    }
  }

}
