import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {

  query: string;
  walletUrl: string;
  votingUrl: string;

  constructor(private router: Router) {
    this.walletUrl = environment.walletUrl;
    this.votingUrl = environment.votingUrl;
  }

  ngOnInit() {
  }

  onSubmit() {
    if (this.query && this.query.length > 0) {
      this.router.navigate(['/search'], { queryParams: { q: this.query } });
    }
    this.query = '';
  }

}
