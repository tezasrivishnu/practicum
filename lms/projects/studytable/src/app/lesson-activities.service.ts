import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { Activity } from './activity';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LessonActivitiesService {

  constructor(private http: HttpClient) { }
  token = localStorage.getItem('access-token');
  getActivities(courseInstanceId:string, lessonId: string): Observable <Activity[]> {
    const url  = environment.apiBaseUrl + `/api/content/get/activities/${courseInstanceId}/${lessonId}` + '/?token='+this.token;
    return this.http.get<Activity[]>(url).pipe(
      tap(_ => console.log("success")),
      catchError(this.handleError<Activity[]>('getActivities', []))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
 
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
 
      // TODO: better job of transforming error for user consumption
      //this.log(`${operation} failed: ${error.message}`);
 
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
