import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { EosService } from '../../services/eos.service';

@Component({
  selector: 'app-console',
  templateUrl: './console.component.html',
  styleUrls: ['./console.component.scss']
})
export class ConsoleComponent implements OnInit {

  apiEndpoint$;
  result$;

  constructor(
    private eosService: EosService
  ) { }

  ngOnInit() {
    this.apiEndpoint$ = this.eosService.apiEndpoint$;
  }

  getInfo() {
    this.result$ = from(this.eosService.eos.getInfo({}));
  }

  getBlock(block_num_or_id: number) {
    this.result$ = from(this.eosService.eos.getBlock(block_num_or_id));
  }

}
