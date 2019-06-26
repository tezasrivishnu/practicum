import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  
  @Input() title;
  constructor(private router:Router) {
    
   }

  ngOnInit() {

  }
  log(){
    localStorage.removeItem('access-token');
    localStorage.removeItem('Program_name')
    this.router.navigate(['/'])
  }
  routeToHome(){
    this.router.navigate(['/']);
  }

 

}
