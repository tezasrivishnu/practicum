import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {QuestionService} from '../question.service';

@Component({
  selector: 'app-assigment-evaluations',
  templateUrl: './assigment-evaluations.component.html',
  styleUrls: ['./assigment-evaluations.component.css']
})
export class AssigmentEvaluationsComponent implements OnInit {


  @Input() userResponse;
  buttonValue: String;
  marksFormSubmit: FormGroup;
  formStatus: boolean;
  constructor(private formBuilder: FormBuilder, private requestService: QuestionService) { }

  ngOnInit() {
    this.formStatus = true;
    console.log("Inside assgn eval component");
    console.log(this.userResponse);
    // this.buttonValue = "Submit"
    var awardedMarks = null;
    var feedback = null;
    // this.marksFormSubmit = this.formBuilder.group({  
    //   'awardedMarks': [awardedMarks, [Validators.required]],
    //   'feedback': [feedback, [Validators.required]]
    //   });

      if (this.userResponse.awardedMarks) {
        awardedMarks = this.userResponse.awardedMarks;
        if (this.userResponse.feedback) feedback = this.userResponse.feedback;
        this.marksFormSubmit = this.formBuilder.group({
          'awardedMarks': [awardedMarks, [Validators.required,Validators.min(0),Validators.max(this.userResponse.maxMarks)]],
          'feedback': [feedback, [Validators.required]],
        });
        this.marksFormSubmit.disable();
        this.buttonValue = "Edit";
        
        return;
      }
      this.marksFormSubmit = this.formBuilder.group({
        'awardedMarks': [awardedMarks, [Validators.required,Validators.min(0),Validators.max(this.userResponse.maxMarks)]],
        'feedback': [feedback, [Validators.required]],
      });
      this.buttonValue = "Submit";
      console.log("onInit");
    console.log(this.marksFormSubmit);
    
    
  }


  hello(){
    console.log("manikanta");
    console.log(this.marksFormSubmit);
  }

  onSubmit() {
    console.log("disabled status",this.marksFormSubmit.disabled);
    if(this.marksFormSubmit.disabled){
      this.marksFormSubmit.enable();
      console.log(this.marksFormSubmit);
      this.buttonValue = "Submit";
      this.userResponse.evaluationStatus = false;
      return;
    }
    // console.log(this.userResponse._id); 
    console.log(this.marksFormSubmit.value);
    console.log(this.marksFormSubmit);
    var data = this.marksFormSubmit.value;
    data["_id"] = this.userResponse._id;
    if(this.marksFormSubmit.valid){
      this.requestService.postData(data);
      this.marksFormSubmit.disable();
      this.userResponse.evaluationStatus = true;
      this.buttonValue = "Edit";
      this.formStatus = true;
    }
    else{
      this.formStatus = false;
    }
    
  }

  showTimestamp(time){
    let displayTime = new Date(time);
    if(displayTime.toDateString() === "Invalid Date"){
      return "You have to answer this question";
    }
    let dt = displayTime.toLocaleDateString()+"  "+displayTime.toLocaleTimeString();
    return dt;
  }

  changeColor(response){
    return response.activityId == 'Quiz' ?  'quiz-color' : response.evaluationStatus ? 'assignment-eval-color' : 'assignment-neval-color';
  }

}
