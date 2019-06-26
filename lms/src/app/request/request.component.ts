import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common';
import { RequestService } from 'projects/signup/src/app/request.service';
@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {
  token;
  userData;
  constructor(private route: ActivatedRoute,private _location: Location,private request:RequestService) {
    this.token=localStorage.getItem('access-token');
   }

  ngOnInit() {
    this.request.getData(this.token).subscribe(data => {
      this.userData = data;
      console.log("data->",this.userData);
    });
  }
  accept(item){
    var post = item._id;
    this.request.friendAccept({item:post},this.token);
    this._location.back();
  }

}
