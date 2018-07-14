import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  @Output() onSearchExpanded = new EventEmitter<boolean>();
  query: FormControl;
  expanded = false;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    this.query = new FormControl();
  }

  search() {
    if (this.query.value) {
      this.router.navigate(['/search'], {
        queryParams: { q: this.query.value }
      });
      this.query.reset();
    }
  }

  expand() {
    this.expanded = true;
    this.onSearchExpanded.emit(this.expanded);
  }

  collapse() {
    this.expanded = false;
    this.onSearchExpanded.emit(this.expanded);
  }

}
