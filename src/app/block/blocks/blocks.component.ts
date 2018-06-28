import {Component, OnInit} from '@angular/core';
import {BlockService} from '../../services/block.service';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-blocks',
  templateUrl: './blocks.component.html',
  styleUrls: ['./blocks.component.css']
})
export class BlocksComponent implements OnInit {
  blocks = null;
  private subscriber: Subscription;
  page = 1;


  constructor(private blockService: BlockService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {

    this.subscriber = this.route.queryParams.subscribe(params => {
      this.page = params['page'] || 1;

      this.blockService.getBlocks(this.page).subscribe(data => {
        this.blocks = data;
        console.log(data);
      });
    });
  }

  nextPage() {
    this.page++;
    this.router.navigate(['/blocks'], {queryParams: {page: this.page}});
  }

  prevPage() {
    this.page--;
    this.router.navigate(['/blocks'], {queryParams: {page: this.page}});
  }
}
