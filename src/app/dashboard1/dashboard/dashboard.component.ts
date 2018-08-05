import { Component, OnInit } from '@angular/core';
import { AppService } from '../../services/app.service';
import { Observable } from 'rxjs';
import { SeoService } from '../../services/seo.service';

@Component({
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  isMaintenance$: Observable<boolean>;

  constructor(
    private appService: AppService,
    private seoService: SeoService
  ) { }

  ngOnInit() {
    this.isMaintenance$ = this.appService.isMaintenance$;

    this.seoService.generateTags({
      title: 'EOS Blockchain Dashboard',
      description: 'EOS Blockchain Dashboard',
      image: '',
      slug: 'dashboard-page'
    });
  }

}
