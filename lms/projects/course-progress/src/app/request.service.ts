import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getUser(id) {
    const token = localStorage.getItem('access-token');
    console.log(id);
    return this.httpClient.get(environment.apiBaseUrl + '/api/user/details?id=' + id + '&token=' + token);
  }

  getRole() {
    const token = localStorage.getItem('access-token');
    return this.httpClient.get(environment.apiBaseUrl + '/api/user/role?token=' + token);
  }

  getResponses(userId, programId, courseId, courseInstanceId) {
    const token = localStorage.getItem('access-token');
    return this.httpClient.get(environment.apiBaseUrl + `/api/activityresponse/latest/${userId}/${programId}/${courseId}/${courseInstanceId}?token=${token}`);
  }

  postData(data) {
    const token = localStorage.getItem('access-token');
    return this.httpClient.post(environment.apiBaseUrl + '/api/activityresponse/updatemarks?token=' + token, data).subscribe(data => {
      console.log(data);
    });
  }

  getPrograms() {
    const token = localStorage.getItem('access-token');
    return this.httpClient.get(environment.apiBaseUrl + `/api/program/get/enrolled_programs/${localStorage.getItem('id')}?token=${token}`);
  }

  getCourseInstances(programId) {
    const token = localStorage.getItem('access-token');
    return this.httpClient.get(environment.apiBaseUrl + `/api/course/get/courseinfo/${localStorage.getItem('id')}/${programId}?token=${token}`);
  }

  getStudents(courseInstanceId) {
    const token = localStorage.getItem('access-token');
    return this.httpClient.get(environment.apiBaseUrl + `/api/course-instance/get-batches/${courseInstanceId}/${localStorage.getItem('id')}?token=${token}`);
  }
}
