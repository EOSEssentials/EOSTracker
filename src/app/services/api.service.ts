import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Block, Result } from '../models';
import { LoggerService } from './logger.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient,
    private logger: LoggerService
  ) { }

  getBlock(id: string | number): Observable<Result<Block>> {
    const getBlock$ = typeof id === 'number' ?
      this.http.get(`${environment.apiUrl}/blocks/${id}`) :
      this.http.get(`${environment.apiUrl}/blocks/id/${id}`);
    return getBlock$.pipe(
      map(block => {
        return <Result<Block>>{
          isError: false,
          value: block as Block
        };
      }),
      catchError(error => {
        this.logger.error('API_ERROR', error);
        return of(<Result<Block>>{
          isError: true,
          error: error
        });
      })
    );
  }

}
