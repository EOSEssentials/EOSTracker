import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-producer-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss']
})
export class InformationComponent implements OnInit {

  @Input() producer;

  constructor() { }

  ngOnInit() {
  }

}
