import { Component, OnInit } from '@angular/core';
import {MatCardModule} from '@angular/material/card'; 
import data from './news/news.json';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  title:string;
  date: string;
  author: string;
  image: string;
  summary: string;

  ngOnInit() {
  }
 // map = new Map<String, String>();
  data = data

  constructor(){
    //this.map.set(news);
    data.forEach((title: string, date: string) => {
      console.log(title, date);
    });

  }
}


