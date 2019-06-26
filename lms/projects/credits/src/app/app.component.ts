import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as Papa from 'papaparse';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'credits';
  constructor(private httpClient: HttpClient) { }
  dataList: any[];
  i = 0;
  txt = 'Lorem ipsum typing effect!'; /* The text */
  speed = 150; /* The speed/duration of the effect in milliseconds */

  ngOnInit() {
    this.httpClient.get('assets/credits/credits.csv', { responseType: 'blob' })
      .subscribe(
        data => {
          Papa.parse(data, {
            header: true,
            skipEmptyLines: true,
            complete: (result, file) => {
              console.log(result);
              this.dataList = result.data;
            }
          });
        },
        error => {
          console.log(error);
        }
      );
  }
}
