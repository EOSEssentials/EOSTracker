import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

declare let jquery: any;
declare let $: any;

@Component({
  selector: 'app-producers',
  templateUrl: './producers.component.html',
  styleUrls: ['./producers.component.css']
})
export class ProducersComponent implements OnInit {
  producers = null;

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.http.get(environment.apiUrl + '/producers').subscribe(data => {
      this.producers = data;
      console.log(this.producers);

      let dataPie = [];

      for (let producer of this.producers) {
        dataPie.push({label: producer.name, data: producer.count})
      }

      $.plot($("#flot-pie-chart"), dataPie, {
        series: {
          pie: {
            show: true
          }
        },
        grid: {
          hoverable: true
        },
        tooltip: true,
        tooltipOpts: {
          content: "%p.0%, %s",
          shifts: {
            x: 20,
            y: 0
          },
          defaultTheme: false
        }
      });
    });
  }

}
