import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {  BehaviorSubject} from "rxjs";
import { environment } from 'src/environments/environment';
import { query } from '@angular/animations';
import { tokenKey } from '@angular/core/src/view';

@Injectable({
  providedIn: 'root'
})
export class HomeserService {
  dummy2:object={};
  data2:BehaviorSubject<object>=new BehaviorSubject(this.dummy2);
  d2=this.data2.asObservable();
  constructor(private http:HttpClient) { }
  getdata2(token){
    // console.log(token)
    this.http.get(environment.apiBaseUrl + "/api/home/?token=" + token).subscribe(data=>{
      // console.log(data);
      this.data2.next(data);
    },err=>{
      
      this.data2.next(err);
     this.data2.next({"yolo":"yya"})
    })
  }

  getCoursesCatalog(userId, programId, token){
    var query = environment.apiBaseUrl + '/api/course/get/courseinfo/' + userId + '/' + programId + '/?token=' + token;
    return this.http.get(query);
  }

  getPrograms(userId,token){
    var query = environment.apiBaseUrl + '/api/program/get/enrolled_programs/'+userId+'/?token='+token;
    return this.http.get(query);
  }

  publishContent(data,token){
    var query = environment.apiBaseUrl + '/api/content/post/content-json/?token='+token;
    console.log(query);
    return this.http.post(query,data);
  }

  getCourseLiveStatus(courseId,token){
    return this.http.get(environment.apiBaseUrl+'/api/course-instance/status/isLive/'+courseId+'/?token='+token);
  }

  getRole(token) {
    return this.http.get(environment.apiBaseUrl + '/api/user/role/?token=' + token);
  }

  postCourseInstanceIsLiveStatus(data,token){
    var query = environment.apiBaseUrl+'/api/course-instance/status/update/?token='+token;
    return this.http.post(query,data);
  }

  getProgramName(programId, token){
    var query = environment.apiBaseUrl + '/api/program/get/program-name/' +programId + '/?token = ' + token;
    return this.http.get(query);
  }
}
