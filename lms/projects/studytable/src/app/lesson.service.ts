import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap, filter } from 'rxjs/operators';

import { Lesson } from './lesson';
import { environment } from 'src/environments/environment';
import { LessonsMasterComponent } from './lessons-master/lessons-master.component';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class LessonService {

  private tempLessonData:Lesson[] =  [];
  public lessonsData = new BehaviorSubject<Lesson[]>(this.tempLessonData);
  data:any;

  constructor(private http: HttpClient) { }
  // token = localStorage.getItem('access-token');

  getLessons(course_id: string,token:string){
    const url  = environment.apiBaseUrl + '/api/content/get/content-json/'+ course_id+'/?token='+token;
    // console.log(url);
    return this.http.get(url);

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
