import {Injectable} from '@angular/core';
import {Transaction} from '../models/Transaction';

@Injectable()
export class TransactionService {
  items: Transaction[] = [];

  constructor() {
    //this.items = data.items;

  }

  get (id: number) {
    return this.items[id];
  }
}
