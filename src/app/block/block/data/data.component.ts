import { Component, OnInit, Input } from '@angular/core';
import { EosService } from '../../../services/eos.service';
import { Observable, of } from 'rxjs';
import { Block, Result } from '../../../models';

@Component({
  selector: 'app-block-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss']
})
export class DataComponent implements OnInit {

  @Input() block: Block;
  block$: Observable<Result<Block>>;

  constructor(
    private eosService: EosService
  ) { }

  ngOnInit() {
    if (this.block.chainData) {
      this.block$ = of(<Result<Block>>{
        isError: false,
        value: this.block
      });
    } else {
      this.block$ = this.eosService.getBlock(this.block.blockNumber);
    }
  }

}
