import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Validators, FormBuilder, FormGroup, FormGroupDirective } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface modalData {
  programID: string;
  courseID: string;
}

@Component({
  selector: 'app-course-instance-modal',
  templateUrl: './course-instance-modal.component.html',
  styleUrls: ['./course-instance-modal.component.css']
})
export class CourseInstanceModalComponent implements OnInit {
  courseInstanceForm: FormGroup;
  mentorsList: any;
  inchargeDisplay: string;
  instructorDisplay: string;
  isFormReady: boolean = false;
  messageType: string;
  message: string;

  constructor(
    public dialogRef: MatDialogRef<CourseInstanceModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: modalData,
    private formBuilder: FormBuilder,
    private httpClient: HttpClient) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onNoClickData(data): void {
    this.dialogRef.close(data);
  }

  ngOnInit() {
    this.courseInstanceForm = this.formBuilder.group({
      courseInstanceLabel: [[], Validators.required],
      
      courseIncharge: [[], Validators.required],
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

  get form() {
    return this.courseInstanceForm.controls;
  };

  onChanges() {
    this.courseInstanceForm.get('courseIncharge').valueChanges.subscribe(val => {
      if (val && val.length > 0) {
        let mentor = this.mentorsList.find(mentor => mentor._id == val[0]);
        this.inchargeDisplay = mentor.firstName + " " + mentor.lastName;
      }
    });

  }

  onSubmit(formDirective: FormGroupDirective) {
    var data = this.courseInstanceForm.value;
    console.log("data before",data);
    data.programID = this.data.programID;
    data.courseID = this.data.courseID;
    console.log("data after",data);
    this.httpClient.post(environment.apiBaseUrl + "/api/course-instance/create?token="+localStorage.getItem('access-token'), data).subscribe(data => {
      console.log("data inside http",data);
      this.message = "Course instance has been created";
      this.messageType = "success";
      formDirective.resetForm();
      this.courseInstanceForm.reset();
      this.onNoClickData(data);
    }, (error) => {
      console.log('Adding to DB failed');
      this.message = "Course instance creation failed";
      this.messageType = "failed";
    });
  };
}
