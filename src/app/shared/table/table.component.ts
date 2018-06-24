import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  @Input() dataSource: any;
  page$ = Observable.of(1);

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.page$ = this.route.queryParams.pipe(
      map(queryParams => queryParams.page ? Number(queryParams.page) : 1)
    );
  }

  next(currentPage) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page: currentPage + 1 }
    });
  }

  previous(currentPage) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page: currentPage - 1 }
    });
  }

}
