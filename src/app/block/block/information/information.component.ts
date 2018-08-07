import { Component, OnInit, Input } from '@angular/core';
import { Block } from '../../../models';

@Component({
  selector: 'app-block-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss']
})
export class InformationComponent implements OnInit {

  @Input() block: Block;

  constructor() { }

  ngOnInit() {
  }

}
