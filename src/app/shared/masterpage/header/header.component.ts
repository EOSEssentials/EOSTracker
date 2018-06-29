import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() onMenuToggle = new EventEmitter();

  logoUrl = environment.logoUrl;
  appName = environment.appName;

  constructor() { }

  ngOnInit() {
  }

}
