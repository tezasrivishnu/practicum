import { Component, OnInit} from '@angular/core';
import { ActivatedRoute,Router} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { RequestService } from 'projects/signup/src/app/request.service';
import {Location} from '@angular/common';


@Component({
  selector: 'app-edit-component',
  templateUrl: './edit-component.component.html',
  styleUrls: ['./edit-component.component.css']
})
export class EditComponentComponent implements OnInit {
  userData;
  token;
  i:any;
  edit;
  post;
  
  constructor(private httpClient: HttpClient,private request:RequestService, private route: ActivatedRoute,
    private router:Router, private _location: Location) { 
    this.token=localStorage.getItem('access-token');
  }  
  
  ngOnInit() {
    this.i = this.route.snapshot.paramMap.get('id');
    this.httpClient.get(environment.apiBaseUrl + "/api/user/userdetails?token="+this.token).subscribe(data => {
      this.userData = data;
    });
  }
  modify() {
    this.userData.additionalInfo[this.i] = this.edit;
    this.post = {...this.userData.additionalInfo};
    this.request.updateData(this.post,this.token);
    this._location.back();
  }
  back() {
    this._location.back();
  }

}
