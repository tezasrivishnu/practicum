import { Component } from '@angular/core';
import * as jwt_decode from "jwt-decode";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  user = "";
  newTitle = "";
  title = 'lms';

  onData(data){
    var token=localStorage.getItem('access-token');
    if(token){
     var decoded = jwt_decode(token);
     this.user=decoded.email;
     }
     else{
       this.user=null;
     }
   this.newTitle=data;
  }
  
  onDestroy(data){
    var token=localStorage.getItem('access-token');
    if(token){
     var decoded = jwt_decode(token);
     this.user=decoded.email;
     }
     else{
       this.user=null;
     }
   this.newTitle=data;
  }

}
