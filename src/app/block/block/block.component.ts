import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {EosService} from '../../services/eos.service';
import {BlockService} from '../../services/block.service';

@Component({
  selector: 'app-block',
  templateUrl: './block.component.html'
})
export class BlockComponent implements OnInit {
  public id: number;
  public block = null;
  public blockRaw = null;
  public transactions = null;
  private subscriber: Subscription;
  page = 1;

  constructor(
    private route: ActivatedRoute,
    private router: Router, 
    private eosService: EosService,
    private blockService: BlockService
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];

    this.blockService.getBlock(this.id).subscribe(data => {
      this.block = data;
      console.log(this.block);
      this.subscriber = this.route.queryParams.subscribe(params => {
        this.page = params['page'] || 1;

        this.blockService.getBlockTransactions(this.id, this.page).subscribe(data => {
          this.transactions = data;
          console.log(data);
        });
      });
    });

    this.eosService.eos.getBlock(this.id).then(result => {
      this.blockRaw = result;
    });
  }

  nextPage() {
    this.page++;
    this.router.navigate(['/blocks/' + this.id + '/transactions'], {queryParams: {page: this.page}});
  }

  prevPage() {
    this.page--;
    this.router.navigate(['/blocks/' + this.id + '/transactions'], {queryParams: {page: this.page}});
  }
}