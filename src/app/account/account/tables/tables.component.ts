import { Component, OnInit, Input } from '@angular/core';
import { EosService } from '../../../services/eos.service';
import { Observable, combineLatest, from } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-account-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit {

  @Input() account;
  accountTables$: Observable<any[]>;

  constructor(
    private eosService: EosService
  ) { }

  ngOnInit() {
    if (this.account && this.account.abi && this.account.abi.tables) {
      const table$s: Observable<any>[] = this.account.abi.tables.map(table => {
        return from(
          this.eosService.eos.getTableRows(true, this.account.name, this.account.name, table.name, table.key_names[0])
        ).pipe(
          map(tableRows => ({ ...table, ...tableRows }))
        );
      });
      this.accountTables$ = combineLatest(table$s);
    }
  }

}
