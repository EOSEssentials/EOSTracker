import {Injectable} from '@angular/core';
import {Producer} from '../models/Producer';

@Injectable()
export class ProducerService {
  items: Producer[] = [];

  constructor() {
   // this.items = data.items;

  }

  get (id: number) {
    return this.items[id];
  }
}
