import { Component, OnChanges, Input } from '@angular/core';

@Component({
  selector: 'app-price-trending',
  templateUrl: './trending.component.html',
  styleUrls: ['./trending.component.scss']
})
export class TrendingComponent implements OnChanges {

  @Input() percentage: number;

  constructor() { }

  ngOnChanges() {
  }

}
