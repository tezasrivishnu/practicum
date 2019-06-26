import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/user';

@Component({
  selector: 'app-single-invite-status',
  templateUrl: './single-invite-status.component.html',
  styleUrls: ['./single-invite-status.component.css']
})
export class SingleInviteStatusComponent implements OnInit {
  @Input() userData: User;
  color: string;
  constructor() { }

  ngOnInit() {
    if (this.userData.status == 'Mail failed') this.color = 'warn';
    if (this.userData.status == 'Mail sent') this.color = 'accent';
    if (this.userData.status == 'Registration pending') this.color = 'accent';
    if (this.userData.status == 'Complete') this.color = 'primary'; 
  }

}
