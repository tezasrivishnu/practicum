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
  accountType;
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
      this.size = this.userData.friendRequest.length;
      this.firstName = this.userData.firstName.toUpperCase();
      this.lastName = this.userData.lastName.toUpperCase();
      this.flag = this.userData.isPrivate;
      this.accountType = (this.flag) ? "Private Profile":"Public Profile";
    });
  }
  toggleChange(){
    this.flag = !this.flag;
    var post = this.flag;
    this.request.updateProfile({item:post},this.token);
    location.reload();
  }
  additionalFunction(){
    this.additionalDisplay = true;
    this.academicDisplay = false;
  }
  academicFunction(){
    this.additionalDisplay = false;
    this.academicDisplay = true;
  }
}
