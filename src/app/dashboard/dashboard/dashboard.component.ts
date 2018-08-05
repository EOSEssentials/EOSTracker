import { Component, OnInit } from '@angular/core';
import { AppService } from '../../services/app.service';
import { Observable } from 'rxjs';

@Component({
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  isMaintenance$: Observable<boolean>;

  constructor(
    private appService: AppService
  ) { }

  ngOnInit() {
    this.isMaintenance$ = this.appService.isMaintenance$;
  }

}
