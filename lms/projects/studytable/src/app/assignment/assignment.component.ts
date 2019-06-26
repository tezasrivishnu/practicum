import { Component, OnInit, Input } from '@angular/core';
import { Question } from '../question';
import { FormGroup, FormControl, Validators, FormBuilder, ValidatorFn, AbstractControl } from '@angular/forms';
import {QuestionService} from '../question.service';
import { ActivatedRoute, UrlSerializer } from '@angular/router';
import { getRtlScrollAxisType } from '@angular/cdk/platform';
import { ThemePalette, MatAccordion, MatSnackBar } from '@angular/material';
import { access } from 'fs';
import {environment} from 'src/environments/environment';
// import {MaterialModule} from '../../../../../src/app/material';

@Component({
  selector: 'app-assignment',
  templateUrl: './assignment.component.html',
  styleUrls: ['./assignment.component.css']
})
export class AssignmentComponent implements OnInit {

  @Input()multi: boolean;
  @Input() question: Question;
  @Input() activityId: String;
  @Input() questionId: String;
  @Input() activityType: String;
  form: FormGroup;
  formTryAgain: FormGroup;
  latestResponseTime: any;
  token: String;
  courseId: string;
  courseInstanceId: string;
  moduleId: string;
  programId: string;
  userResponse: any;
  accessToken: string;
  userRole:string;
  displaySubmissions:boolean; //for mentor
  displayScore: boolean; //for student
  mentorStudents: any[];
  studentsResponses: any[];
  rolever=false;
  buttonValue: string;
  userId: string;
  studentResponse: Object;
  spin: boolean;
  loadingScore:boolean;
  loadingSubmission:boolean;
  loadingResponse: boolean;
  environment:any;
  courseLiveStatus;
  

  constructor(private questionService: QuestionService, private route: ActivatedRoute, private formBuilder: FormBuilder,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.environment = environment;
    this.studentsResponses = [];
    this.displayScore = false;
    this.loadingScore = false;
    this.loadingSubmission = false;
      this.accessToken = localStorage.getItem('access-token');
      this.userId = localStorage.getItem('id');
      this.displaySubmissions = false;
      this.loadingResponse = false;
      this.token = localStorage.getItem('access-token');
      this.question
      this.courseId = this.route.snapshot.paramMap.get('courseId');
     this.courseInstanceId = this.route.snapshot.params.courseInstanceId;
     this.moduleId = this.route.snapshot.params.lessonId;
     this.programId = this.route.snapshot.params.programId;

      this.buttonValue = "Submit Answer";
      this.form = this.formBuilder.group({
        'assignment': ['', [Validators.required]]
      });
      console.log("courseInstanceId: ",this.courseInstanceId);
      this.questionService.getCourseLiveStatus(this.courseInstanceId).subscribe((data) => {
        this.courseLiveStatus = data['status'];
      });
      
     
     this.getLatestResponse();
     this.verifyRole();

     let tempmentorstud: any;

     this.questionService.getStudents(this.courseInstanceId).subscribe((data)=>{
        this.mentorStudents = data['studentsID'];
        console.log(this.mentorStudents);
     });
    //  this.verifyRole();

   
    }

    hello(){
      // console.log(this.form);
    }

    

  submit(formValue) {
    // todo store the hyperlink on the server
    let maxMarks = this.question.max_marks;
    // console.log(formValue);
    if(this.form.disabled){
      this.form.enable();
      // console.log(this.form);
      this.buttonValue = "Submit Answer";
      return;
    }
    this.questionService.getCourseLiveStatus(this.courseInstanceId).subscribe(data => {
      var queryResponse;
      queryResponse = data; 
      if(queryResponse.status == true){
        console.log("hello");
        if(this.form.valid){
          this.loadingResponse = true;
          this.questionService.postResponse(this.token,this.programId,this.courseId,this.courseInstanceId,this.moduleId,this.activityType,this.activityId,this.questionId,formValue,true,maxMarks).subscribe( d => {
              console.log("Assignment details store successfully");
              this.getLatestResponse();
              
            },error => console.log(error),()=>{this.loadingResponse = false});
          this.form.disable();
          this.buttonValue = "Try Again";
        }
      }
      else{
        this.courseLiveStatus = false;
        this.snackBar.open("Currently not accepting submission.","close", {"duration": 2000});
      }
    });
    
  }

  showTimestamp(time){
    let displayTime = new Date(time);
    if(displayTime.toDateString() === "Invalid Date"){
      return "You have to answer this question";
    }
    let dt = displayTime.toLocaleDateString()+"  "+displayTime.toLocaleTimeString();
    return dt;
  }

  tryAgain(){
    this.latestResponseTime = false;
    this.form.reset();
    this.userResponse.result=false;
  }

  getLatestResponse(){
    // this.spin = true;
    
    this.loadingResponse = true;
    this.questionService.getLatestResponse(this.token,this.programId, this.courseId,this.courseInstanceId,this.moduleId,this.activityId,this.questionId).subscribe( data =>{
      this.userResponse = data;
      
      this.latestResponseTime = this.userResponse.timestamp;
      // console.log("latest Response");
      console.log(this.latestResponseTime);
      console.log(this.userResponse);
      this.setForm(this.userResponse);
  },error =>{ console.log(error); this.loadingResponse = false; }, () => {this.loadingResponse = false;});
  }

  setForm(value){
    if(value){
      this.form = this.formBuilder.group({
        'assignment': [ value.response.assignment, [Validators.required]]
      });
      this.form.disable();
      this.buttonValue = "Try Again";
    }
  }

  validateResponse(data){
    if(data===undefined) return false;
    else return true;
  }

  verifyRole(){
    let role;
    // console.log(this.accessToken);
    this.questionService.getRole(this.accessToken).subscribe(d => {
      // console.log(d);
      role = d['role'];
      this.userRole = d['role'];
      // console.log(d);
      if(role == 'mentor') this.rolever = true;
    });
  }

  showSubmissions(){
    this.studentsResponses = [];
    if(this.displaySubmissions == false) {
      this.displaySubmissions = true;
    }
    else{
      this.displaySubmissions = false;
    }
    // console.log("hello");
    this.loadingSubmission = true;
    this.mentorStudents.forEach( student => {
      this.questionService.getUserLatestResponse(student,this.programId,this.courseInstanceId,this.moduleId,this.activityId,this.questionId).subscribe(d => {
        // console.log(typeof d);
        this.studentsResponses.push(new Object(d));
        // console.log(this.studentsResponses);
      });

    });
    this.loadingSubmission = false;
    
  }


  showScore(){
    this.loadingScore = true;
    if(this.displayScore == false){
      this.displayScore = true;
    }
    else{
      this.displayScore = false;
    }
    this.questionService.getUserLatestResponse(this.userId,this.programId,this.courseInstanceId,this.moduleId,this.activityId,this.questionId).subscribe(d => {
      this.studentResponse = d;
    },error => {console.log(error);this.loadingScore= false;this.snackBar.open("No Submissions found",'close',{duration:2000});},() => {this.loadingScore= false});
  
    
  }
}
