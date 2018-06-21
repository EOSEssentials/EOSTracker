import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Action } from '../models/Action';

@Injectable()
export class ActionService {

  constructor(
    private http: HttpClient
  ) { }

  getAction(id: string): Observable<Action> {
    return this.http.get(`${environment.apiUrl}/actions/${id}`).pipe(
      map(action => action as Action)
    );
  }

  getActions(page = 1): Observable<Action[]> {
    return this.http.get(`${environment.apiUrl}/actions`, {
      params: new HttpParams({
        fromString: `page=${page}`
      })
    }).pipe(
      map((actions: any) => actions.map(action => action as Action))
    );
  }

}
