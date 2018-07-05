import { Component, OnInit } from '@angular/core';
import { EosService } from '../../services/eos.service';
import { Producer } from '../../models/Producer';
import { Observable, from } from 'rxjs';

@Component({
  templateUrl: './producers.component.html',
  styleUrls: ['./producers.component.css']
})
export class ProducersComponent implements OnInit {

  producers$: Observable<Producer[]>;
  chainStatus$: Observable<any>;

  constructor(
    private eosService: EosService
  ) { }

  ngOnInit() {
    this.producers$ = this.eosService.getProducers();
    this.chainStatus$ = this.eosService.getChainStatus();
  }

}
