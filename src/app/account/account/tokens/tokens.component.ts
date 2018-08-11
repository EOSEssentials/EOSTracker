import { Component, OnChanges, Input } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-account-tokens',
  templateUrl: './tokens.component.html',
  styleUrls: ['./tokens.component.scss']
})
export class TokensComponent implements OnChanges {

  @Input() tokens: Observable<any>[];

  constructor() { }

  ngOnChanges() {
  }

}
