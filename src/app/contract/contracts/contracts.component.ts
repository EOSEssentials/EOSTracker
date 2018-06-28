import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {ActionService} from '../../services/action.service';

@Component({
  selector: 'app-contracts',
  templateUrl: './contracts.component.html'
})
export class ContractsComponent implements OnInit {
  private subscriber: Subscription;
  page = 1;
  actions = null;

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private actionService: ActionService
  ) { }

  ngOnInit() {
    this.subscriber = this.route.queryParams.subscribe(params => {
      this.page = params['page'] || 1;
      this.actionService.getActions(this.page).subscribe(data => {
        this.actions = data;
        console.log(data);
      });
    });
  }

  nextPage() {
    this.page++;
    this.router.navigate(['/actions'], {queryParams: {page: this.page}});
  }

  prevPage() {
    this.page--;
    this.router.navigate(['/actions'], {queryParams: {page: this.page}});
  }
}
