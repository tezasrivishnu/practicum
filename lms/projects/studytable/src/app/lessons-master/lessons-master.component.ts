import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { LessonService } from '../lesson.service';
import { Lesson } from '../lesson';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-lessons-master',
  templateUrl: './lessons-master.component.html',
  styleUrls: ['./lessons-master.component.css']
})
export class LessonsMasterComponent implements OnInit {

  lessons: Lesson[];
  courseName: string;
  courseId: string;
  courseInstanceId: string;
  environment;
  token: string;
  
  constructor(
    private route: ActivatedRoute,private router: Router,
    private lessonService: LessonService,
    private location: Location
    ) {
      
    }

  ngOnInit() {
    // console.log('getting token');
    this.token = '';
    this.token = localStorage.getItem('access-token');
    console.log(this.token);
    this.courseInstanceId = this.route.snapshot.paramMap.get('courseInstanceId');
    this.courseId = this.route.snapshot.paramMap.get('courseId');    
    console.log(this.router.url);
    
    
    // console.log('token received and verify');
    if(this.token == null){
      console.log('token is null');
        this.router.navigate(['/auth/login']); //TODO add redirect parameter to app-routing module
        return;
    }
    else{

      this.getLessons(this.courseInstanceId);
      this.courseName = this.route.snapshot.paramMap.get('course');
      // console.log("inside lesson master");
      // console.log(this.route.snapshot);
      // console.log(this.courseId);
      this.environment = environment;
    }
    
    
  }

  getLessons(courseInstanceId: string) {
    this.lessonService.getLessons(courseInstanceId, this.token).subscribe((data) => {

      console.log("courseJson->",data['contentJSON']);
      try{
        data['contentJSON'] ? this.lessons = data['contentJSON'] : this.lessons = null;
      }
      catch(error){
        if(error instanceof TypeError){
          console.log("Error while getting content for the selected course");
        }
      }
    },(error)=>{
      console.log("Error while getting content for the selected course");
      console.log(error);
    });
    
  }

}
