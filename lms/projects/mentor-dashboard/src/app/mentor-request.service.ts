import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MentorRequestService {
  userRole: any;

  constructor(private httpClient : HttpClient) { }

  async validateUser(token) {
    await this.getRole(token).subscribe(data =>{
      if (data) {
        this.userRole = data['role'];
        if (this.userRole.role != "mentor"){
          return false;
        } else {
          return true;
        }
      }
      
    });
    
  }

  getRole(token){
    return this.httpClient.get(environment.apiBaseUrl + "/api/getrole/?token=" + token).pipe(
      tap(_ => console.log('user role fetched')),);
  }

  getMyCourses(token) {
    return this.httpClient.get(environment.apiBaseUrl + "/api/mycourses/?token=" + token).pipe(
      tap(_ => console.log('fetched')),
    );
  }

  postCourseInstance(data) {
    this.httpClient.post(environment.apiBaseUrl + "/api/create-instance", data).subscribe(d =>{
      console.log(d);
    });
  }
}
