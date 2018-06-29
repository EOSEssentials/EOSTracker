import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  query: FormControl;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    this.query = new FormControl();
  }

  search() {
    if (this.query.value) {
      this.router.navigate(['/search'], {
        queryParams: { q: this.query.value },
        skipLocationChange: true
      });
      this.query.reset();
    }
  }

}
