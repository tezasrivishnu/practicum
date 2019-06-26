import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Input() username;
  flag=1;
  courseTitle: string;
  constructor(private router: Router, private sharedService: SharedService) { }

  ngOnInit() {
    if(localStorage.getItem('program-name')){
      this.flag=1
      this.courseTitle=localStorage.getItem('program-name');
    }
    else{
    this.sharedService.title.subscribe(data=>{
      this.courseTitle = data;
      if(this.courseTitle)localStorage.setItem('Program_name',this.courseTitle)
    })
  }
}
pgname(){
  return localStorage.getItem('program-name');
}

  log(){
    this.flag=0;
    localStorage.removeItem('access-token');
    
    localStorage.removeItem('program-name');
    localStorage.removeItem('id');
    this.router.navigate(['/auth/login/home']);
  }

  routeToCourseProgress(){
    this.router.navigate(['/course-progress']);
  }

  routeToHome(){
    this.router.navigate(['/program-catalog']);
  }


}
