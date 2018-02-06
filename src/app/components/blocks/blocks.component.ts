import {Component, OnInit} from '@angular/core';
import {BlockService} from '../../services/block.service';
import {HttpClient} from '@angular/common/http';
import {Subscription} from 'rxjs/Subscription';
import {ActivatedRoute, Router} from '@angular/router';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-blocks',
  templateUrl: './blocks.component.html',
  styleUrls: ['./blocks.component.css']
})
export class BlocksComponent implements OnInit {
  blocks = null;
  private subscriber: Subscription;
  page = 0;


  constructor(private blockService: BlockService, private http: HttpClient,private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {

    this.subscriber = this.route.queryParams.subscribe(params => {
      this.page = params['page'] || 0;

      this.http.get(environment.apiUrl + '/blocks?page=' + this.page).subscribe(data => {
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
