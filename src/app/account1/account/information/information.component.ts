import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-account-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss']
})
export class InformationComponent implements OnInit {

  @Input() account;
  @Input() eosPrice: number;

  constructor() { }

  ngOnInit() {
  }

}
