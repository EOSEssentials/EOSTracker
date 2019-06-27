import { Component, OnInit, NgModule } from '@angular/core';
import {MatCardModule} from '@angular/material/card'; 
import data from './proposals.json';

@Component({
  selector: 'app-proposals',
  templateUrl: './proposals.component.html',
  styleUrls: ['./proposals.component.scss']
})

export class ProposalsComponent implements OnInit {

  ngOnInit() {
  }
 // map = new Map<String, String>();



  displayedColumns: string[] = ['Proposals', 'Expires', 'Turn Out', 'Vote'];
  dataSource = data
  constructor(){
    //this.map.set(proposals);
    // data.forEach((title: string, date: string) => {
    //   console.log(title, date);
    // });

  }
}

