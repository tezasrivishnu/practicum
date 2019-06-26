import { Component, OnInit } from '@angular/core';
import { RequestService } from 'projects/signup/src/app/request.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-friend-request',
  templateUrl: './friend-request.component.html',
  styleUrls: ['./friend-request.component.css']
})
export class FriendRequestComponent implements OnInit {
  token:any;
  userData:any;
  constructor(private httpClient: HttpClient,private request:RequestService) { 
    this.token=localStorage.getItem('access-token');
  }

  ngOnInit() {
    this.request.getData(this.token).subscribe(data => {
      this.userData = data;
    });
  }
  accept(item){
    console.log(item);
    this.request.friendAccept({item},this.token);
  }

}
