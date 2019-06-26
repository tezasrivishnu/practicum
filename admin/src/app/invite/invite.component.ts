import { Component, OnInit } from '@angular/core';
import { StatusService } from '../status.service';

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.css']
})
export class InviteComponent implements OnInit {
  errorDataVisibility: boolean = false;
  errorData: string[];
  loading: boolean = false;

  constructor(private statusService: StatusService) { 
    localStorage.setItem("current-page","Invite Users")

   }

  ngOnInit() {
    this.statusService.errorList.subscribe(data=>{
      this.errorData = data;
      if (this.errorData.length>0) this.errorDataVisibility = true;        
      else this.errorDataVisibility = false;
    });

    this.statusService.loading.subscribe(data=>{
      this.loading = data;
    });
  }

}
