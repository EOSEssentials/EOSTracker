import { Component, OnInit } from '@angular/core';
import { StatService } from '../../../services/stat.service';
import { Observable, timer } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-dashboard-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {

  stats$: Observable<any[]>;

  constructor(
    private translate: TranslateService,
    private statService: StatService
  ) { }

  ngOnInit() {
    this.stats$ = timer(0, 5000).pipe(
      switchMap(() => this.statService.getStats()),
      map(stats => stats.map((stat, index) => {
        switch (index) {
          case 0:
            return {
              count: stat,
              color: '#2196F3',
              icon: 'link',
              link: './blocks',
              name: this.translate.instant('Blocks')
            };
          case 1:
            return {
              count: stat,
              color: '#4CAF50',
              icon: 'list_alt',
              link: './transactions',
              name: this.translate.instant('Transactions')
            };
          case 2:
            return {
              count: stat,
              color: '#FF9800',
              icon: 'people',
              link: './accounts',
              name: this.translate.instant('Accounts')
            };
          case 3:
            return {
              count: stat,
              color: '#F44336',
              icon: 'list',
              link: './actions',
              name: this.translate.instant('Actions')
            };
        }
      }))
    );
  }

}
