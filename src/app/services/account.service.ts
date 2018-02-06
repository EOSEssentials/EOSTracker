import {Injectable} from '@angular/core';
import {Account} from '../models/Account';

@Injectable()
export class AccountService {
  items: Account[] = [];

  constructor() {
    //this.items = data.items;

  }

  get (id: number) {
    return this.items[id];
  }
}
