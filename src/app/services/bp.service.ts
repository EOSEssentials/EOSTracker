import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class BpService {

  constructor(
    private http: HttpClient
  ) { }

  getBP(url: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/bps/${url}`);
  }

}
