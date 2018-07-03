import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  navs: {
    icon: string;
    link: string;
    name: string;
    external?: boolean;
  }[];

  constructor(
    private translate: TranslateService
  ) { }

  ngOnInit() {
    this.navs = [
      {
        icon: 'dashboard',
        link: '/v1',
        name: this.translate.instant('Dashboard')
      },
      {
        icon: 'link',
        link: '/v1/blocks',
        name: this.translate.instant('Blocks')
      },
      {
        icon: 'list_alt',
        link: '/v1/transactions',
        name: this.translate.instant('Transactions')
      },
      {
        icon: 'people',
        link: '/v1/accounts',
        name: this.translate.instant('Accounts')
      },
      {
        icon: 'gavel',
        link: '/producers',
        name: this.translate.instant('Producers')
      },
      {
        icon: 'list',
        link: '/v1/actions',
        name: this.translate.instant('Actions')
      },
      {
        icon: 'settings',
        link: '/v1/settings',
        name: this.translate.instant('Settings')
      },
      {
        icon: 'account_balance_wallet',
        external: true,
        link: environment.walletUrl,
        name: this.translate.instant('Wallet')
      },
      {
        icon: 'how_to_vote',
        external: true,
        link: environment.votingUrl,
        name: this.translate.instant('Voting')
      }
    ];
  }

}
