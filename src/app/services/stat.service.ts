import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable()
export class StatService {

  constructor(
    private http: HttpClient
  ) { }

  getStats(): Observable<number[]> {
    return this.http.get(`${environment.apiUrl}/stats`).pipe(
      map((nums: any) => nums.map(num => num as number))
    );
  }

}
