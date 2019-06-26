import { Component, OnInit, Input } from '@angular/core';
import { RequestService } from 'projects/signup/src/app/request.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-friend-list',
  templateUrl: './friend-list.component.html',
  styleUrls: ['./friend-list.component.css']
})
export class FriendListComponent implements OnInit {
  @Input() item;
  i:any;
  token:any;
  userData:any;
  flag = false;
  constructor(private httpClient: HttpClient,private request:RequestService, private route: ActivatedRoute) { 
    this.token=localStorage.getItem('access-token');
    this.request.getData(this.token).subscribe(data => {
      this.userData = data;
    });
  }

  ngOnInit() {
  }
}
