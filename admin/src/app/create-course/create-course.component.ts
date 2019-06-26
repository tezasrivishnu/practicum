import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormGroupDirective } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.css']
})
export class CreateCourseComponent implements OnInit {
  courseForm: FormGroup;
  message: string;
  messageType: string;
  mentorsList;
  inchargeDisplay: string;
  instructorDisplay: string;

  isFormReady: boolean = false;

  constructor(private formBuilder: FormBuilder, private httpClient: HttpClient, private router:Router) { }

  ngOnInit() {
    this.courseForm = this.formBuilder.group({
      courseID: ['', Validators.required],
      courseName: ['', Validators.required],
      courseInstructor: [[], Validators.required],
      courseDescription: ['', Validators.required]
    });
    this.httpClient.get(environment.apiBaseUrl + "/api/user/get/mentors?token="+localStorage.getItem('access-token')).subscribe(data => {
      this.mentorsList = data;
    }, (error) => {
      console.log(error);
    }, () => {
      console.log(this.mentorsList);
    });
    this.onChanges();

    this.isFormReady = true;
  }
  onChanges() {
   

    this.courseForm.get('courseInstructor').valueChanges.subscribe(val => {
      if (val && val.length > 0) {
        let mentor = this.mentorsList.find(mentor => mentor._id == val[0]);
        this.instructorDisplay = mentor.firstName + " " + mentor.lastName;
        console.log(this.instructorDisplay)
      }
    });
  }

  get form() {
    return this.courseForm.controls;
  };

  onSubmit(formDirective: FormGroupDirective) {
    var data = this.courseForm.value;
    console.log(data);
    this.httpClient.post(environment.apiBaseUrl + "/api/course/create?token="+localStorage.getItem('access-token'), data).subscribe(data => {
      console.log(data);
      this.message = "Course has been created";
      this.messageType = "success";
      formDirective.resetForm();
      this.courseForm.reset();
      this.router.navigate(["/modify-catalog"]);
    }, (error) => {
      console.log('Adding to DB failed');
      this.message = "Course creation failed";
      this.messageType = "failed";
    })
  };

}
