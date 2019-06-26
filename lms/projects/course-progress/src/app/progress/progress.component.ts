import { Component, OnInit, Input, Pipe, PipeTransform, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RequestService } from '../request.service';
import { getToken } from '@angular/router/src/utils/preactivation';
import { ThemePalette, MatAccordion, MatDialog, MatDialogConfig  } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { environment } from 'src/environments/environment';
import { SelectDialogComponent } from '../select-dialog/select-dialog.component';
import { CourseInstancePipe } from '../pipes';
var responses;
@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css']
})
export class ProgressComponent implements OnInit {

  @Input()multi: boolean;
  @Input()color: ThemePalette;
  @ViewChild('studentAccordian') studentAccordian: MatAccordion;
  @ViewChild('mentorAccordian') mentorAccordian: MatAccordion;

  constructor(
    private requestService: RequestService,
    public dialog: MatDialog
  ) { }
  spin = true;
  students;
  currentStudent;
  currentCourse;
  currentModule;
  currentCourseInstance;
  currentProgram;
  environment;
  userResponses: any;
  courses;
  token: any;
  userRole: string;
  mentorId: string;
  // mentorStudents: any[];
  currentEvaluationStatus;
  
  ngOnInit() {
  
    this.mentorId = localStorage.getItem('id');
    console.log(this.mentorId);
    this.environment = environment;
    this.currentEvaluationStatus = 'all';
    this.token = localStorage.getItem('access-token');
    this.requestService.getRole().subscribe(d => {
      this.userRole = d['role'] + '';
      console.log(d);
      console.log(this.userRole);
    

      this.openModal();
    });
    
  }

  openModal() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    
    const dialogRef = this.dialog.open(SelectDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
        console.log("Dialog was closed" )
        console.log(result)
        this.currentProgram = result.programId;
        this.currentCourse = result.courseId;
        this.currentCourseInstance = result.courseInstanceId
        if(this.userRole == "mentor") {
          this.requestService.getStudents(result.courseInstanceId).subscribe(data => {
            console.log("-->" + JSON.stringify(data));
            this.students = data['studentsID'];
            console.log(this.students);
            this.requestService.getResponses("_", result.programId, result.courseId, result.courseInstanceId).subscribe(d => {
              this.userResponses = d;
              console.log(d);
              this.userResponses = this.userResponses.filter(x =>  this.students.includes(x.userId._id));
              // if(this.userRole == "student") this.userResponses = this.userResponses.filter(x => {if(x.userId != null) return x.userId._id == localStorage.getItem('id')});
              console.log(this.userResponses);
              this.spin = false;
            });
          });
  
        }
        if(this.userRole == "student") {
          this.requestService.getResponses(localStorage.getItem('id'),result.programId, result.courseId, result.courseInstanceId).subscribe(d => {
            this.userResponses = d;
            // this.userResponses = this.userResponses.filter(x =>  this.students.includes(x.userId._id));
            // if(this.userRole == "student") this.userResponses = this.userResponses.filter(x => {if(x.userId != null) return x.userId._id == localStorage.getItem('id')});
            console.log(this.userResponses);
            this.spin = false;
          });
        } 
        
      });
    }

  toUnique(arr) {
    const res = [];
    const set = new Set();
    for (const item of arr) {
        if(!set.has(item._id)){
            set.add(item._id);    // set any value to Map
            res.push(item);
        }
    }
    return res;
  }
  toUsers(responses) {
    return this.toUnique(responses.map(d => d.userId)).sort((a, b) => (a.userID > b.userID) ? 1 : -1);
  }

  toPrograms(responses) {
    return this.toUnique(responses.map(d => d.programId)).sort((a, b) => (a.programName > b.programName) ? 1 : -1);
  }

  toCourses(responses) {
    return this.toUnique(responses.map(d => d.courseId)).sort((a, b) => (a.courseName > b.courseName) ? 1 : -1);
  }

  toCourseInstances(responses) {
    return this.toUnique(responses.map(d => d.courseInstanceId)).sort((a, b) => (a.courseInstanceLabel > b.courseInstanceLabel) ? 1 : -1);
  }

  toModules(responses) {
    return this.toUnique(responses.map(d => d.moduleId)).sort((a, b) => (a.name > b.name) ? 1 : -1);
  }

  toTypes(responses) {
    var activities = new Set(responses.map(d => d.activityType));
    return activities;
  }

  changeColor(response){
    return response.activityType == 'quiz' ?  'quiz-color' : response.evaluationStatus ? 'assignment-eval-color' : 'assignment-neval-color';
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
      case 2:
        this.currentStudent = '';
      default:
        return;
    }
  }

  courseClicked() {
    // this.currentModule='';
    // this.currentCourseInstance = '';
  }

  courseInstanceClicked() {
    // this.currentModule='';
  }

  openAll(accordian){
    accordian.openAll();
    return;
  }

  closeAll(accordian){
    accordian.closeAll();
    return;
  }

  iconChange(activityType){
    return activityType == "quiz"? "question_answer" : "assignment";
  }

  showTimestamp(time){
    let displayTime = new Date(time);
    if(displayTime.toDateString() === "Invalid Date"){
      return "You have to answer this question";
    }
    let dt = displayTime.toLocaleDateString()+"  "+displayTime.toLocaleTimeString();
    return dt;
  }

  onSubmit(e) {
    if (e) 
      this.requestService.getResponses("_", this.currentProgram, this.currentCourse, this.currentCourseInstance).subscribe(d => {
        this.userResponses = d;
        this.userResponses = this.userResponses.filter(x =>  this.students.includes(x.userId._id));
        // this.userResponses = d;
        console.log(this.userResponses);
        this.spin = false;
      });
  }

}

