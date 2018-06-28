import {Component, OnInit} from '@angular/core';
import {AccountService} from '../../services/account.service';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {
  accounts = null;
  private subscriber: Subscription;
  page = 1;

  constructor(private accountService: AccountService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {

    this.subscriber = this.route.queryParams.subscribe(params => {
      this.page = params['page'] || 1;
      this.accountService.getAccounts(this.page).subscribe(data => {
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
