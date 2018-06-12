import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {EosService} from '../../services/eos.service';

declare let jquery: any;
declare let $: any;

@Component({
  selector: 'app-producers',
  templateUrl: './producers.component.html',
  styleUrls: ['./producers.component.css']
})
export class ProducersComponent implements OnInit {
  producers = null;

  constructor(private http: HttpClient, private eosService: EosService) {
  }

  ngOnInit() {

    this.eosService.eos.getTableRows(
      {
        json: true,
        code: "eosio",
        scope: "eosio",
        table: "producers",
        limit: 100000
      }
    ).then(result => {
      this.producers = result.rows;
      this.producers.sort(function(a,b) {return (parseFloat(a.total_votes) < parseFloat(b.total_votes)) ? 1 : ((parseFloat(b.total_votes) < parseFloat(a.total_votes)) ? -1 : 0);} )
      console.log(result.rows);
    });

    /*
    this.http.get(environment.apiUrl + '/producers').subscribe(data => {
      this.producers = data;
      console.log(this.producers);

      let dataPie = [];

      for (let producer of this.producers) {
        dataPie.push({label: producer.name, data: producer.num})
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

    */
  }

}
