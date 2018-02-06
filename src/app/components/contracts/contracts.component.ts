import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-contracts',
  templateUrl: './contracts.component.html',
  styleUrls: ['./contracts.component.css']
})
export class ContractsComponent implements OnInit {
  private subscriber: Subscription;
  page = 0;
  messages = null;

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.subscriber = this.route.queryParams.subscribe(params => {
      this.page = params['page'] || 0;
      this.http.get(environment.apiUrl + '/messages?page=' + this.page).subscribe(data => {
        this.messages = data;
        console.log(data);
      });
    });
  }

  nextPage() {
    this.page++;
    this.router.navigate(['/contracts'], {queryParams: {page: this.page}});
  }

  prevPage() {
    this.page--;
    this.router.navigate(['/contracts'], {queryParams: {page: this.page}});
  }
}
