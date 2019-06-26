import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthserService {

constructor() { 

 }
 public isAuthenticated(): boolean {
  const token = localStorage.getItem('access-token');
  if(token){
    return true;
  }  
  return false;
}

}
