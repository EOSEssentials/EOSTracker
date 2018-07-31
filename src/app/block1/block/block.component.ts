import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlockService } from '../../services/block.service';
import { Block, Result } from '../../models';
import { Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

@Component({
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.scss']
})
export class BlockComponent implements OnInit {

  id$: Observable<number>;
  block$: Observable<Result<Block>>;

  constructor(
    private route: ActivatedRoute,
    private blockService: BlockService
  ) { }

  ngOnInit() {
    this.id$ = this.route.params.pipe(
      map(params => Number(params.id))
    );
    this.block$ = this.id$.pipe(
      switchMap(id => this.blockService.getBlock(id))
    );
  }

}
