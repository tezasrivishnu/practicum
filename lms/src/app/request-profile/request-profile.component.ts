import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common';
import { RequestService } from 'projects/signup/src/app/request.service';

@Component({
  selector: 'app-request-profile',
  templateUrl: './request-profile.component.html',
  styleUrls: ['./request-profile.component.css']
})
export class RequestProfileComponent implements OnInit {

  @Input() item;
  i;
  token;
  userData;
  userData1;
  constructor(private route: ActivatedRoute,private _location: Location,private request:RequestService) {
    this.token=localStorage.getItem('access-token');
   }

  ngOnInit() {
    var post = this.item;
    this.request.getClassMate(post,this.token).subscribe(data => {
      this.userData = data;
    });
    this.request.getData(this.token).subscribe(data => {
      this.userData1 = data;
    });
  }
  accept(){
    var post = this.item;
    this.request.friendAccept({item:post},this.token);
    this._location.back();
  }

}
