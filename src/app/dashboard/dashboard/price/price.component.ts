import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-dashboard-price',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.scss']
})
export class PriceComponent implements OnInit {

  @Input() price: any;

  constructor() { }

  ngOnInit() {
  }

}
