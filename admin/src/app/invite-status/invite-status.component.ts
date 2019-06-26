import { Component, OnInit } from '@angular/core';
import { StatusService } from '../status.service';
import { User } from '../user';

@Component({
  selector: 'app-invite-status',
  templateUrl: './invite-status.component.html',
  styleUrls: ['./invite-status.component.css']
})
export class InviteStatusComponent implements OnInit {
  usersData: User[] = new Array();
  tempUser:User = new User();
  searchTerm: string;
  chips = [
    { name: 'Mail failed', color: 'warn', selected:false },
    { name: 'Mail sent', color: 'accent', selected:false },
    { name: 'Registration pending', color: 'accent', selected:false },
    { name: 'Complete', color: 'primary', selected:false }
  ];
  selectedCategory: string;
  constructor( private statusService: StatusService ) { }

  ngOnInit() {
    this.statusService.initialLoad();
    this.statusService.successList.subscribe(userData =>{
      this.usersData = userData;
    });
  }

  toggle(selected: number){
    for (let index = 0; index < this.chips.length; index++) {
      if (index == selected){
        if (this.chips[index].selected) this.selectedCategory = null;
        else this.selectedCategory = this.chips[index].name;
        this.chips[index].selected = !this.chips[index].selected;
      }
      else this.chips[index].selected = false;
    }
  }
}
