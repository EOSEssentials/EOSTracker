import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../services/app.service';

@Component({
  selector: 'app-dashboard-chain-status',
  templateUrl: './chain-status.component.html',
  styleUrls: ['./chain-status.component.scss']
})
export class ChainStatusComponent implements OnInit {

  status$;

  constructor(
    private appService: AppService
  ) { }

  ngOnInit() {
    this.status$ = this.appService.info$;
  }

}
