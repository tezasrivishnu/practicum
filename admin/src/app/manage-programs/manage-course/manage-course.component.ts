import { Component, OnInit, Input, Inject, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material';
import { CourseInstanceModalComponent } from './course-instance-modal/course-instance-modal.component';

export interface modalData {
  programID: string;
  courseID: string;
}

@Component({
  selector: 'app-manage-course',
  templateUrl: './manage-course.component.html',
  styleUrls: ['./manage-course.component.css']
})

export class ManageCourseComponent implements OnInit {
  @Input() courseObject;
  @Input() courseInstances;
  @Input() program;
  @Output() modified=new EventEmitter();
  programID: string;
  courseID: string;

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }
  update(index){
    this.courseInstances[index].isLive=!this.courseInstances[index].isLive;
    this.modified.emit({_id:this.courseInstances[index]._id,isLive:this.courseInstances[index].isLive})
    console.log(this.courseInstances[index])
  
  }

  createCourseInstance() {
    const dialogRef = this.dialog.open(CourseInstanceModalComponent, {
      data: { programID: this.program._id, courseID: this.courseObject._id }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      this.courseInstances.push(result);
    });
  }

}
