import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-contract-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss']
})
export class InformationComponent implements OnInit {

  @Input() action;

  constructor() { }

  ngOnInit() {
  }

}
