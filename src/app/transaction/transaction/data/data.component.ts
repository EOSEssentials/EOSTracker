import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-transaction-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss']
})
export class DataComponent implements OnInit {

  @Input() transaction;

  constructor() { }

  ngOnInit() {
  }

}
