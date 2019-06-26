import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common';
import { RequestService } from 'projects/signup/src/app/request.service';



@Component({
  selector: 'app-classmate-profile',
  templateUrl: './classmate-profile.component.html',
  styleUrls: ['./classmate-profile.component.css']
})
export class ClassmateProfileComponent implements OnInit {
  @Input() item;
  i;
  token;
  userData;
  userData1;
  post;
  flag;
  constructor(private route: ActivatedRoute,private _location: Location,private request:RequestService) {
    this.token=localStorage.getItem('access-token');
   }

  ngOnInit() {
    
    this.i = this.route.snapshot.paramMap.get('id');
    var post = this.i;
    this.request.getClassMate(post,this.token).subscribe(data => {
      this.userData = data;
    });
    this.request.getData(this.token).subscribe(data => {
      this.userData1 = data;
    });
    
  }
  back() {
    this._location.back();
  }
  sendRequest(){
    var post = this.i;
    this.request.friendRequest({item:post},this.token);
    this._location.back();
  }
  infriends(){
    console.log(!!this.userData1.friends.find(element=>element._id==this.userData._id));
    return !!this.userData1.friends.find(element=>element._id==this.userData._id);
  }

}
