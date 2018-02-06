import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable()
export class DashboardService {
  items: any = [];

  constructor(private http: HttpClient) {

    this.http.get(environment.apiUrl + '/stats').subscribe(data => {
      console.log(data);
      this.items = data;
    });
  }

  get (id: number) {
    return this.items[id];
  }
}
