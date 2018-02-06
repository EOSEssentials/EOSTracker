import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  query: string;

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  onSubmit() {
    if (this.query && this.query.length > 0) {
      this.router.navigate(['/search'], {queryParams: {q: this.query}});
    }
    this.query = '';
  }

}
