import { Component, OnInit } from '@angular/core';
import { User } from '../user'
import { StatusService } from '../status.service';

@Component({
  selector: 'app-batch-invite',
  templateUrl: './batch-invite.component.html',
  styleUrls: ['./batch-invite.component.css']
})
export class BatchInviteComponent implements OnInit {
  usersData: string;
  userObject: User = new User();
  successDataList: any[] = [];
  errorDataList = [];
  constructor(private statusService: StatusService) { }

  ngOnInit() {
  }

  dataRetrieve(){
    var result = this.usersData.split("\n");
    this.successDataList=[];
    this.errorDataList=[];
    result.forEach(user => {
      var userDetails = user.split("\t");
      if (userDetails.length == 3){
        this.userObject = new User();
        this.userObject.userID = userDetails[0];
        if (this.ValidateEmail(userDetails[1])) {
          this.userObject.email = userDetails[1];
        }
        else{
          this.errorDataList.push(user);
          // this.statusService.updateErrorList(user);
          return;
        }
        this.userObject.type = userDetails[2];
        this.successDataList.push(this.userObject);
      }
      else{
        this.errorDataList.push(user);
        // this.statusService.updateErrorList(user);
      }
    });
    this.usersData = "";
    var finalSuccessDataList = [];
    this.successDataList.forEach(user => {
      if(!finalSuccessDataList.some(x => (x.userID == user.userID || x.email == user.email))) finalSuccessDataList.push(user);
    });
    console.log(finalSuccessDataList);
    if (finalSuccessDataList.length>0) this.statusService.toDB(finalSuccessDataList);
    this.statusService.updateErrorList(this.errorDataList);
  }

  ValidateEmail(mail: string){
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(mail)){
      return (true)
    }
    return (false)
  }

}
