import { Component, OnInit } from '@angular/core';
import { EosService } from '../../../services/eos.service';

@Component({
  selector: 'app-dashboard-chain-status',
  templateUrl: './chain-status.component.html',
  styleUrls: ['./chain-status.component.scss']
})
export class ChainStatusComponent implements OnInit {

  status$;

  constructor(
    private eosService: EosService
  ) { }

  ngOnInit() {
    this.status$ = this.eosService.getInfo();
  }

}
