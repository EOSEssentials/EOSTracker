import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  private subscriber: Subscription;
  public query: string;
  result = null;

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) {
  }

  ngOnInit() {
    this.subscriber = this.route.queryParams.subscribe(params => {
      this.query = <string>params['q'];
      console.log(this.query);
      let queryInt = Number(this.query);
      if (!isNaN(queryInt)) {
        this.router.navigateByUrl('/blocks/' + this.query);
      } else if (this.query.length === 64) {

        this.http.get(environment.apiUrl + '/transactions/' + this.query).subscribe(data => {
          console.log(data);
          if (data) {
            this.router.navigateByUrl('/transactions/' + this.query);
          }
        });

        this.http.get(environment.apiUrl + '/blocks/id/' + this.query).subscribe(data => {
          console.log(data);
          if (data) {
            this.router.navigateByUrl('/blocks/' + data['blockNumber']);
          }
        });
      } else if (this.query.length == 53) {
        // TODO: allow this
        this.http.get(environment.apiUrl + '/accounts/key/' + this.query).subscribe(data => {
          console.log(data);
          if (data) {
            this.router.navigateByUrl('/accounts/' + data["name"]);
          }
        });
      } else {
        this.router.navigateByUrl('/accounts/' + this.query);
      }
    });
  }
}
