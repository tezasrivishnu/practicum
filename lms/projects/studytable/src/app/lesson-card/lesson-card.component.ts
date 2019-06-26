import { Component, OnInit, Input } from '@angular/core';
import { Lesson } from '../lesson'
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-lesson-card',
  templateUrl: './lesson-card.component.html',
  styleUrls: ['./lesson-card.component.css']
})

export class LessonCardComponent implements OnInit {

  @Input() lesson: Lesson;
  @Input() courseId: string;
  @Input() courseInstanceId: String;
  programId:string;
  environment;
  constructor(private router: Router, private route:ActivatedRoute) { }

  ngOnInit() {
    this.environment = environment;
    this.programId = this.route.snapshot.params.programId;
    console.log("Inside Lesson Card");
    console.log(this.lesson);
    
  }

  startLesson(lessonId:string) {
    console.log("lessonId=>"+lessonId);
    
    this.router.navigate(['studytable/activities/'+this.programId+'/'+this.courseInstanceId+'/'+lessonId, {courseId: this.courseId}]);
  }
}
