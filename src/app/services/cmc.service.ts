import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CMCTicker {
  data?: {
    name: string;
    symbol: string;
    quotes: {
      USD: {
        price: number,
        market_cap: number,
        volume_24h: number
      }
    }
  };
  metadata?: any
}

@Injectable()
export class CmcService {

  constructor(
    private http: HttpClient
  ) { }

  getEOSTicker(): Observable<CMCTicker> {
    return this.http.get('https://api.coinmarketcap.com/v2/ticker/1765/');
  }

}
