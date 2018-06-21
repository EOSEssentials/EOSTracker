import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  logoUrl: string;
  appName: string;

  constructor() {
    this.logoUrl = environment.logoUrl;
    this.appName = environment.appName;
  }

  ngOnInit() {
  }

}
