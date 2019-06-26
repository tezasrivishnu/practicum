import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthserService } from "./authser.service";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

constructor(public auth: AuthserService, public router: Router ) { 
  
 }
 canActivate(): boolean {
  if (!this.auth.isAuthenticated()) {
    window.location.href=environment.lmsUrl+"/auth/login/home";
    return false;
  }
  return true;
}

}
