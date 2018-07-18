import { Component, OnInit, OnChanges, Input, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnChanges {

  @Input() dataSource: any;
  @Input() title = '';
  @Input() enablePager = true;
  page$ = of(1);
  visibility = 'hidden';

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.page$ = this.route.queryParams.pipe(
      map(queryParams => queryParams.page ? Number(queryParams.page) : 1)
    );
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!changes.dataSource.firstChange) {
      this.visibility = 'hidden';
    }
  }

  next(currentPage) {
    this.visibility = 'visible';
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page: currentPage + 1 }
    });
  }

  previous(currentPage) {
    this.visibility = 'visible';
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page: currentPage - 1 }
    });
  }

}
