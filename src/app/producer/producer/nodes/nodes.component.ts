import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-producer-nodes',
  templateUrl: './nodes.component.html',
  styleUrls: ['./nodes.component.scss']
})
export class NodesComponent implements OnInit {

  @Input() location;

  constructor() { }

  ngOnInit() {
  }

}
