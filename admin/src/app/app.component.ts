import { Component, OnInit } from '@angular/core';
import * as jwt_decode from "jwt-decode";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  pageInfo;
  constructor(){
  };

  ngOnInit(){
    
  }
  title = 'Admin';
  
  onData(event){
    this.pageInfo=localStorage.getItem("current-page");
  }
  onDestroy(event){
    this.pageInfo=localStorage.getItem("current-page");

  }
  

}
