import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Subscription} from 'rxjs/Subscription';
import {EosService} from '../../services/eos.service';

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
  page = 0;

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router, private eosService: EosService) {
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];

    this.http.get(environment.apiUrl + '/blocks?block_num=' + this.id).subscribe(data => {
      this.block = data[0];
      console.log(this.block);
      this.subscriber = this.route.queryParams.subscribe(params => {
        this.page = params['page'] || 0;

        this.http.get(environment.apiUrl + '/transactions?block_id=' + this.block.block_id + '&page=' + this.page).subscribe(data => {
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
    this.router.navigate(['/blocks/' + this.id], {queryParams: {page: this.page}});
  }

  prevPage() {
    this.page--;
    this.router.navigate(['/blocks/' + this.id], {queryParams: {page: this.page}});
  }
}