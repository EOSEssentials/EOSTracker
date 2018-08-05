import { Component, OnInit, Input } from '@angular/core';
import { EosService } from '../../../services/eos.service';
import { Observable, from } from 'rxjs';

@Component({
  selector: 'app-block-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss']
})
export class DataComponent implements OnInit {

  @Input() id: number;
  blockRaw$: Observable<any>;

  constructor(
    private eosService: EosService
  ) { }

  ngOnInit() {
    this.blockRaw$ = from(this.eosService.eos.getBlock(this.id));
  }

}
