import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Vote } from '../models/Vote';

@Injectable()
export class VoteService {

  constructor(
    private http: HttpClient
  ) { }

  getVote(name: string, page = 0): Observable<Vote> {
    return this.http.get(`${environment.apiUrl}/votes/${name}`, {
      params: new HttpParams({
        fromString: `page=${page}`
      })
    }).pipe(
      map(vote => vote as Vote)
    );
  }

}
