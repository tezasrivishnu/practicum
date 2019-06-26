import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { ViewEncapsulation } from '@angular/core';
import { MentorRequestService } from '../mentor-request.service';
import {Router} from "@angular/router";
import { getOrCreateInjectable } from '@angular/core/src/render3/di';
import {MatSnackBar} from '@angular/material';


@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CreateCourseComponent implements OnInit {
  courseForm: FormGroup;
  courses;
  selectedCourse;
  post: any;
  token: any;
  userRole: any;

  constructor(
    private formBuilder: FormBuilder,
    private mrService: MentorRequestService,
    private router: Router,
    private snackBar: MatSnackBar
    ) { }

  ngOnInit() {
    this.token = localStorage.getItem('access-token');
    // console.log(this.token);
   
    if(!this.token){
      this.router.navigate(["/auth/login/cc"]);
    }
    if(!this.mrService.validateUser(this.token)){
      this.router.navigate(["/notfound"]);
    }
  
    this.mrService.getMyCourses(this.token).subscribe(data => {
      this.courses = data;
      this.createForm();
      // console.log(this.courses);
    });
  }

  createForm(){
    this.courseForm = this.formBuilder.group({
      duration: [null, Validators.required],
      startDate: [null, Validators.required],
      endDate: [null, Validators.required],
      commitId: [null, Validators.required],
      isLive: [null, Validators.required],
      isAlive: [null, Validators.required],
      batch: [null, Validators.required]
    },{
      validator: this.dateCheck('startDate', 'endDate')
    });
  }

  dateCheck(fcontrolName: string, scontrolName: string) {
    return (formGroup: FormGroup) => {
      const fcontrol = formGroup.controls[fcontrolName];
      const scontrol = formGroup.controls[scontrolName];

      if (scontrol.errors && !scontrol.errors.mustMatch) {
        return;
      }

      if (fcontrol.value > scontrol.value) {
        fcontrol.setErrors({ dateCheck: true });
      } else {
        fcontrol.setErrors(null);
      }
    }
  }

  get form(){
    return this.courseForm.controls;
  };

  onSubmit(formDirective: FormGroupDirective){
    console.log(formDirective);
    console.log(this.courseForm);
    if (!this.courseForm.valid) return;
    var data = this.courseForm.value;
    console.log("entire data", this.courseForm);
    
    data['course_id'] = this.selectedCourse._id;
    console.log(data);
    this.post = data;
    this.mrService.postCourseInstance(data);
    this.snackBar.open("course instance", "created", {
      duration: 2000,
    });
    formDirective.resetForm();
    this.courseForm.reset();
  };

  // onSubmit(startDate: HTMLInputElement, endDate: HTMLInputElement){
  //   var data = this.courseForm.value;
  //   data.startDate = startDate.value;
  //   data.endDate = endDate.value;
  //   console.log(data);
  // };

}
