import {Injectable} from '@angular/core';
import {Block} from '../models/Block';

@Injectable()
export class BlockService {
  items: Block[] = [];

  constructor() {
    //this.items = data.items;

  }

  get (id: number) {
    return this.items[id];
  }
}
