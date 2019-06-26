import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
// @ts-ignore
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
// @ts-ignore
export class QuestionService {

  constructor(private http: HttpClient) {

  }

  token = localStorage.getItem('access-token');

  getCourseLiveStatus(courseId){
    return this.http.get(environment.apiBaseUrl+'/api/course-instance/status/isLive/'+courseId+'/?token='+this.token);
  }
  getRole(token) {
    return this.http.get(environment.apiBaseUrl + '/api/user/role/?token=' + token);
  }

  postData(data) {

    this.http.post(environment.apiBaseUrl + '/api/activityresponse/updatemarks/?token=' + this.token, data).subscribe(data => {
      console.log(data);
    });
  }

  postResponse(token, programId,courseId, courseInstanceId, lessonId, activityType, activityId, questionId, response, result, maxMarks) {
    console.log('activity title' + activityId);
    const data = {
      programId: programId,
      courseInstanceId: courseInstanceId,
      courseId: courseId,
      moduleId: lessonId,
      activityType,
      activityId,
      questionId,
      response,
      maxMarks
    };

    // tslint:disable-next-line:no-unused-expression
    // @ts-ignore
    activityType === 'quiz' ? data.result = result : data ;
    console.log(data);

    return this.http.post(environment.apiBaseUrl + '/api/activityresponse/insert/?token=' + token, data);
  }


 
  getUserLatestResponse(userId, programId, courseName, lessonName, activityId, questionId) {
    // tslint:disable-next-line:max-line-length
    const url = environment.apiBaseUrl + '/api/activityresponse/latest/' +  userId + '/' + programId + '/' + courseName + '/' + lessonName + '/' + activityId + '/' + questionId + '?token=' + this.token;
    console.log('Inside get USer latest Response');
    console.log(url);
    return this.http.get(url);
  }

  getLatestResponse(token, programId,courseId,courseInstanceId, lessonId, activityId, questionId) {
    // tslint:disable-next-line:max-line-length
    const url =  environment.apiBaseUrl + '/api/activityresponse/latest/' + localStorage.getItem('id')+'/' + programId+'/' +courseId+'/'+ courseInstanceId + '/' + lessonId + '/' + activityId + '/' + questionId + '?token=' + this.token;
    return this.http.get(url);
  }

  getResponses() {
    return this.http.get(environment.apiBaseUrl + '/api/activityresponse/latest/' + '?token=' + this.token);
  }

  getStudents(courseId:string) {
    const token = localStorage.getItem('access-token');
    // tslint:disable-next-line:max-line-length
    return this.http.get(environment.apiBaseUrl + `/api/course-instance/get-batches/${courseId}/${localStorage.getItem('id')}?token=${token}`);
  }
}
