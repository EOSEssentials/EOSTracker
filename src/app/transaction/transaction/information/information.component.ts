import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-transaction-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss']
})
export class InformationComponent implements OnInit {

  @Input() transaction;

  constructor() { }

  ngOnInit() {
  }

}
