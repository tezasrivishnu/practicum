import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { RequestService } from '../request.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-select-dialog',
  templateUrl: './select-dialog.component.html',
  styleUrls: ['./select-dialog.component.css']
})
export class SelectDialogComponent implements OnInit {
  environment;
  programs;
  currentProgram;
  courses;
  currentCourse;
  courseInstances;
  currentCourseInstance;
  courseData;
  constructor(
    private requestService: RequestService,
    public dialogRef: MatDialogRef<SelectDialogComponent>,
  ) { }

  ngOnInit() {
    this.environment = environment;
    this.requestService.getPrograms().subscribe(data => {
      data = data[0]['enrollments'].map(x => x.programID);
      console.log(data);
      this.programs = data;
    });
  }

  getCourses() {
    console.log(this.currentProgram);
    this.requestService.getCourseInstances(this.currentProgram).subscribe(data => {
      this.courseData = data['courses'];
      console.log(data);
      this.courses = data['courses'].map(x => x.courseID);
      console.log(this.courses);
       
    });
  }

  getCourseInstances() {
    // this.courseData = data;
    this.courseInstances = this.courseData.find(x => x.courseID._id == this.currentCourse).courseInstances;
    console.log(this.courseInstances)
  }

  selectClicked(i: number) {
    // this.currentCourse=''; 
    // this.currentModule='';
    // this.currentCourseInstance = '';
    switch (i) {
      case 0:
        this.currentCourse = '';
      case 1:
        this.currentCourseInstance = ''; 
      default:
        return;
    }
  }

  submit() {
    this.dialogRef.close({
      programId: this.currentProgram,
      courseId: this.currentCourse,
      courseInstanceId: this.currentCourseInstance
    });
  }

}
