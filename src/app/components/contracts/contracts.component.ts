import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-contracts',
  templateUrl: './contracts.component.html'
})
export class ContractsComponent implements OnInit {
  private subscriber: Subscription;
  page = 0;
  actions = null;

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.subscriber = this.route.queryParams.subscribe(params => {
      this.page = params['page'] || 0;
      this.http.get(environment.apiUrl + '/actions?page=' + this.page).subscribe(data => {
        this.actions = data;
        console.log(data);
      });
    });
  }

  nextPage() {
    this.page++;
    this.router.navigate(['/actions'], {queryParams: {page: this.page}});
  }

  prevPage() {
    this.page--;
    this.router.navigate(['/actions'], {queryParams: {page: this.page}});
  }
}
