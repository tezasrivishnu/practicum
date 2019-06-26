import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RequestService } from 'projects/signup/src/app/request.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-display',
  templateUrl: './user-display.component.html',
  styleUrls: ['./user-display.component.css']
})
export class UserDisplayComponent implements OnInit {
  token:any;
  userData:any;
  firstName:any;
  lastName:any;
  userData_DOB:any;
  size:any;
  flag;
  additionalDisplay = true;
  academicDisplay = false;
  constructor(private httpClient: HttpClient,private request:RequestService) { 
    this.token=localStorage.getItem('access-token');
  }

  ngOnInit() {
    this.request.getData(this.token).subscribe(data => {
      this.userData = data;
      this.size = Object.keys(this.userData).length
      this.firstName = this.userData.firstName;
      this.lastName = this.userData.lastName;
      this.flag = this.userData.isPrivate;
      this.userData_DOB=this.userData.dateOfBirth.substring(0,10);
      console.log("size->",this.size);
      console.log("data->",this.userData);
    });
  }
  toggleChange(){
    this.flag = !this.flag;
    var post = this.flag;
    console.log("in component->",this.flag);
    this.request.updateProfile({item:post},this.token);
    location.reload();
  }
}
