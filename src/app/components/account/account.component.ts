import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {environment} from '../../../environments/environment';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  public name: number;
  public account = null;
  public transactions = null;
  private subscriber: Subscription;
  page = 0;

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) {
  }

  ngOnInit() {
    this.name = this.route.snapshot.params['id'];
    this.http.get(environment.apiUrl + '/accounts?name=' + this.name).subscribe(data => {
      this.account = data[0];
      console.log(this.account)
    });

    this.subscriber = this.route.queryParams.subscribe(params => {
      this.page = params['page'] || 0;

      this.http.get(environment.apiUrl + '/transactions?scope=' + this.name + '&page=' + this.page).subscribe(data => {
        this.transactions = data;
        console.log(data);
      });
    });
  }

  nextPage() {
    this.page++;
    this.router.navigate(['/accounts/' + this.name], {queryParams: {page: this.page}});
  }

  prevPage() {
    this.page--;
    this.router.navigate(['/accounts/' + this.name], {queryParams: {page: this.page}});
  }
}
