import { Component, OnInit } from '@angular/core';
import { RequestService } from 'projects/signup/src/app/request.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  token:any;
  userData:any;
  size:any;
  constructor(private httpClient: HttpClient,private request:RequestService) { 
    this.token=localStorage.getItem('access-token');
  }

  ngOnInit() {
    this.request.getData(this.token).subscribe(data => {
      this.userData = data;
      this.size = Object.keys(this.userData).length
      console.log("hello->",this.size);
      console.log(this.userData);
    });
  }

}
