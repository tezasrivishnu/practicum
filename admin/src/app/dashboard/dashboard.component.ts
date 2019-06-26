import { Component, OnInit } from '@angular/core';
import {  ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  flag;
  constructor(private route: ActivatedRoute, private http: HttpClient) {
    localStorage.setItem('current-page', 'Admin Dashboard');
    let k = this.route.snapshot.queryParams.token;
    this.flag = false;
    console.log( this.route.snapshot.queryParams.token);
    if (localStorage.getItem('access-token')) {
    k = localStorage.getItem('access-token');
   }
    console.log(k);
    this.http.get(environment.apiBaseUrl + '/api/user/read/verify-admin/?token=' + k).subscribe(data => {
     console.log(data);
     if (data) {
       localStorage.setItem('access-token', k);
       this.flag = true;

    }
   }, err => {
     console.log(false);
   });
   }

  ngOnInit() {

  }

}
