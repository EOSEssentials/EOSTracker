import { Component, OnInit, Input } from '@angular/core';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-dashboard-price',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.scss']
})
export class PriceComponent implements OnInit {

  @Input() price: any;
  token = environment.token;

  constructor() { }

  ngOnInit() {
  }

}
