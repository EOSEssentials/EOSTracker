import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  constructor() { }

  error(type: string, err: any) {
    // TODO: log
    console.error(type, err);
  }

}
