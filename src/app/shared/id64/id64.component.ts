import { Component, OnChanges, Input } from '@angular/core';

@Component({
  selector: 'id-64',
  templateUrl: './id64.component.html',
  styleUrls: ['./id64.component.scss']
})
export class Id64Component implements OnChanges {

  @Input() id: string;
  @Input() override;
  breakpoint;

  constructor() { }

  ngOnChanges() {
    this.breakpoint = { ...DEFAULTS, ...this.override };
  }

}

const DEFAULTS = { xs: 160, sm: 240, md: 320, lg: 400 };
