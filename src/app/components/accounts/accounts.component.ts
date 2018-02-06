import {Component, OnInit} from '@angular/core';
import {AccountService} from '../../services/account.service';
import {HttpClient} from '@angular/common/http';
import {Subscription} from 'rxjs/Subscription';
import {ActivatedRoute, Router} from '@angular/router';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {
  accounts = null;
  private subscriber: Subscription;
  page = 0;

  constructor(private accountService: AccountService, private http: HttpClient, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {

    this.subscriber = this.route.queryParams.subscribe(params => {
      this.page = params['page'] || 0;
      this.http.get(environment.apiUrl + '/accounts?page=' + this.page).subscribe(data => {
        this.accounts = data;
      });
    });
  }

  nextPage() {
    this.page++;
    this.router.navigate(['/accounts'], {queryParams: {page: this.page}});
  }

  prevPage() {
    this.page--;
    this.router.navigate(['/accounts'], {queryParams: {page: this.page}});
  }

}
