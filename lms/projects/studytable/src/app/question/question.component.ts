import { Component, OnInit, Input } from '@angular/core';
import { Question } from '../question';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from '../question.service';
import { MatSnackBar } from '@angular/material';
import { tokenKey } from '@angular/core/src/view';
import {environment} from 'src/environments/environment';


@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  form: FormGroup;
  formTryAgain: FormGroup;
  isValid: boolean;
  @Input() activityType: String;
  @Input() question: Question;
  @Input() activityId: String;
  @Input() questionId: String;
  feedback: string;
  lessonId: string;
  courseId:string;
  courseInstanceId:string;
  programId: string;
  courseName: string;
  token: string;
  userResponses: Object;
  latestResponseTime: any;
  ack: boolean;
  userResponse:any;
  userAnswer: string;
  show:boolean;
  environment: any;
  emptySubmission: boolean;
  courseLiveStatus: boolean;
  constructor(private fb: FormBuilder, private route:ActivatedRoute, private questionService: QuestionService, private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.environment = environment;
    this.token = localStorage.getItem('access-token');
      this.form = this.fb.group({
        choices: this.getChoices()
      });
      this.formTryAgain = this.fb.group({
        choices: this.getChoices()
      });
      this.emptySubmission = false;
      this.lessonId = this.route.snapshot.params.lessonId;
      this.courseInstanceId = this.route.snapshot.params.courseInstanceId;
      this.courseId = this.route.snapshot.paramMap.get('courseId');
      this.programId = this.route.snapshot.params.programId;
      this.getLatestResponse();
  }

  getChoices() {
    const arr = this.question.options.map(option => {
      return this.fb.control(false);
    });
    return this.fb.array(arr);
  }


  submit(form) {
    const formValue = Object.assign({}, form.value, {
      choices: form.choices.map((selected, i) => {
        return {
          option: this.question.options[i].option,
          selected
        }
      })
    });
    if(this.checkEmptyAnswer(formValue.choices)){
      this.emptySubmission = true;
      return;
    }

    this.questionService.getCourseLiveStatus(this.courseInstanceId).subscribe(data => {
      this.courseLiveStatus = data['status'];
      
      if(data['status']){
        let valid = this.validateAnswer(formValue.choices);
        console.log("form choices");
        console.log(formValue.choices);
        console.log(this.validateAnswer(formValue.choices));
        console.log(valid);
        if (valid) this.feedback = this.question.correct_feedback;
        else this.feedback = this.question.wrong_feedback;
        let maxMarks = this.question.max_marks;
        this.questionService.postResponse(this.token,this.programId,this.courseId,this.courseInstanceId,this.lessonId,this.activityType,this.activityId,this.questionId,formValue,valid,maxMarks).subscribe(d =>{
          console.log("User response stored successfully fetched ");
          console.log(d);
          this.isValid = valid;
          this.getLatestResponse(); 
        
        });
      }
      else{
        this.courseLiveStatus = false;
        this.snackBar.open("Currently not accepting submission.","close", {"duration": 2000});
      }
    });
    
    
    // this.validateResponse(true);
  }

  tryAgain(){
    this.latestResponseTime = false;
    this.form.reset();
    this.form = this.fb.group({
      choices: this.getChoices()
    });
    
    this.show = false;

  }

  checkEmptyAnswer(response: any[]){
    for (let i = 0; i < response.length; i++) {
      if (response[i].selected == true)
        return false;
    }
    return true;
  }

  validateAnswer(response: any[]) {
    for (let i = 0; i < response.length; i++) {
      if (response[i].selected != this.question.options[i].correct)
        return false;
    }
    return true;
  }

  getLatestResponse(){

    this.questionService.getLatestResponse(this.token,this.programId,this.courseId,this.courseInstanceId,this.lessonId,this.activityId,this.questionId).subscribe( data =>{
      this.userResponse = data;
      this.latestResponseTime = this.userResponse.timestamp;
      this.userAnswer = this.userResponse.result? "Your Answer is Correct":"Your Answer is Wrong";
      console.log("latest Response");
      console.log(this.latestResponseTime);
      this.isValid = this.validateAnswer(this.userResponse.response.choices);
      if(this.userResponse && this.isValid){
        this.feedback = this.question.correct_feedback; 
      }
      else if(this.userResponse && !this.isValid){
        this.feedback = this.question.wrong_feedback;
      }
      
  },(error)=>{console.log("error here ");
    console.log(error);  
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

  validateResponse(data){
    if(data===undefined) return false;
    else return true;
  }
  
}
