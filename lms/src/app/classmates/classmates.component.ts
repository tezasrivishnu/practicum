import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { RequestService } from 'projects/signup/src/app/request.service';

@Component({
  selector: 'app-classmates',
  templateUrl: './classmates.component.html',
  styleUrls: ['./classmates.component.css']
})
export class ClassmatesComponent implements OnInit {
  userData;
  userData1;
  token;
  constructor(private router:Router, private httpClient:HttpClient, private request:RequestService) { 
    this.token=localStorage.getItem('access-token');
  }

  ngOnInit() {
    this.request.getAllStudents(this.token).subscribe(data => {
      this.userData = data;
    });
    this.request.getData(this.token).subscribe(data => {
      this.userData1 = data;
    });
  }
  }
