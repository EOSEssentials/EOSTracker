import { Component, OnInit } from '@angular/core';
import { AppService } from '../../services/app.service';
import { Observable } from 'rxjs';

@Component({
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  eosQuote$: Observable<boolean>;

  constructor(
    private appService: AppService
  ) { }

  ngOnInit() {
    this.eosQuote$ = this.appService.eosQuote$;
  }

}
