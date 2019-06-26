import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  static getData: any;

  constructor(private httpClient : HttpClient) { }

  getUser(code:String): Observable<any> {
    console.log(environment.apiBaseUrl);
    return this.httpClient.get(environment.apiBaseUrl + "/api/invites/lookup/"+code).pipe(
      tap(_ => console.log('fetched')),
    );
  }

  sendOTP(phoneNo) {
    console.log(phoneNo)
    this.httpClient.post(environment.apiBaseUrl + "/api/registration/sendotp", {phoneNo: phoneNo}).subscribe(data =>{
      console.log(data);
    });
  }

  verifyOTP(data): Observable<any> {
    return this.httpClient.post(environment.apiBaseUrl + "/api/registration/verifyotp", data);
  }

  sendData(data, code) {
    this.httpClient.post(environment.apiBaseUrl + "/api/registration/register", data).subscribe(data =>{
      console.log(data);
    });
    this.httpClient.get(environment.apiBaseUrl + "/api/invites/complete/"+code).pipe(
      tap(_ => console.log('fetched')),
    ).subscribe(d => console.log(d));
  }
  updateData(data,token) {
      console.log("data->",data);
      var query = environment.apiBaseUrl + "/api/user/update?token="+token;
      console.log(query);
      return this.httpClient.post(query,data).subscribe(data =>{
        console.log(data);;
    });
  }
  friendRequest(data,token){
    console.log("data in service->",data);
    var query = environment.apiBaseUrl + "/api/user/friendrequest?token="+token;
    return this.httpClient.post(query,data).subscribe(data =>{
      console.log(data);
  });
  }
  friendAccept(data,token){
    console.log("")
    var query = environment.apiBaseUrl + "/api/user/friendaccept?token="+token;
    return this.httpClient.post(query,data).subscribe(data =>{
      console.log(data);
  });
  }
    getData(token){
      return this.httpClient.get(environment.apiBaseUrl + "/api/user/userdetails?token="+token);
    }
    getAllStudents(token){
      return this.httpClient.get(environment.apiBaseUrl + "/api/user/get/student-list?token="+token);
    }
    getClassMate(data,token){
      console.log("in service->",data);
      var query = environment.apiBaseUrl + "/api/user/getclassmate/" + data +"/?token="+token;
      return this.httpClient.get(query);
    }
    updateProfile(data,token){
      console.log("in service->",data);
      var query = environment.apiBaseUrl + "/api/user/updateProfile?token="+token;
      return this.httpClient.post(query,data).subscribe(data =>{
      console.log(data);
  });
    }
}
