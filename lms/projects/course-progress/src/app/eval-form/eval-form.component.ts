import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { RequestService } from '../request.service';
@Component({
  selector: 'app-eval-form',
  templateUrl: './eval-form.component.html',
  styleUrls: ['./eval-form.component.css']
})
export class EvalFormComponent implements OnInit {

  @Input() userResponse;
  buttonValue: String;
  @Output() submitted: EventEmitter<any> = new EventEmitter();

  constructor(
    private requestService : RequestService
  ) { }
  marksFormSubmit: FormGroup;
  formBuilder: FormBuilder;
  formStatus: boolean;
  ngOnInit() {
    var awardedMarks = null;
    var feedback = null;
    if (this.userResponse.awardedMarks) {
      awardedMarks = this.userResponse.awardedMarks;
      if (this.userResponse.feedback) feedback = this.userResponse.feedback;
      this.formBuilder = new FormBuilder();
      this.marksFormSubmit = this.formBuilder.group({
        'awardedMarks': [awardedMarks, [Validators.required,Validators.min(0),Validators.max(this.userResponse.maxMarks)]],
        'feedback': [feedback, [Validators.required]],
      });
      this.marksFormSubmit.disable();
      this.buttonValue = "Edit";
      return;
    }
    this.formBuilder = new FormBuilder();
    this.marksFormSubmit = this.formBuilder.group({
      'awardedMarks': [awardedMarks, [Validators.required,Validators.min(0),Validators.max(this.userResponse.maxMarks)]],
      'feedback': [feedback, [Validators.required]],
    });
    this.buttonValue = "Submit";
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
}
