import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { ConstantPool } from '@angular/compiler';
import { MAT_CHECKBOX_CLICK_ACTION } from "@angular/material";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-program-invites',
  templateUrl: './program-invites.component.html',
  styleUrls: ['./program-invites.component.css']
})
export class ProgramInvitesComponent implements OnInit {
  studentList: any;
  form: FormGroup;
  result = "";
  role;

  constructor(private httpClient: HttpClient, private formBuilder: FormBuilder, private route: ActivatedRoute) {
    localStorage.setItem("current-page", "Invite " + this.route.snapshot.params["role"])
    this.role = this.route.snapshot.params["role"]+"s";
  }

  ngOnInit() {
    console.log(this.route.snapshot.params['program_id']);
    this.form = this.formBuilder.group({
      studentList: new FormArray([])
    });
    if (this.route.snapshot.params["role"] == "student") {
      this.httpClient.get(environment.apiBaseUrl + "/api/user/get/student-list?token=" + localStorage.getItem('access-token')).subscribe(data => {
        this.studentList = data;
        this.addCheckBoxes();
        console.log(data);
      });
    }
    else {
      this.httpClient.get(environment.apiBaseUrl + "/api/user/get/mentors?token=" + localStorage.getItem('access-token')).subscribe(data => {
        this.studentList = data;
        this.addCheckBoxes();
        console.log(data);
      });
    }

  }

  addCheckBoxes() {
    this.studentList.map((o, i) => {
      const control = new FormControl(i >= 0);
      // control.setValue(true);
      (this.form.controls.studentList as FormArray).push(control);
    });
  }

  onSubmit() {
    var finalArray = [];
    for (let index = 0; index < this.studentList.length; index++) {
      const student = this.studentList[index];
      if (this.form.value.studentList[index]) finalArray.push(student._id);
    }
    console.log(finalArray);
    this.httpClient.post(environment.apiBaseUrl + "/api/user/post/student-list/" + this.route.snapshot.params['role'] + "/" + this.route.snapshot.params['program_id'] + "?token=" + localStorage.getItem('access-token'), finalArray).subscribe(data => {
      console.log(data);
      this.result = "Successfully added"

    })
  }
  selectToggle() {
    let temp = this.form.get('studentList') as FormArray;

    for (let index = 0; index < temp.length; index++) {
      temp.controls[index].setValue(!temp.controls[index].value);
    }
  }
  selectAll() {
    let temp = this.form.get('studentList') as FormArray;

    for (let index = 0; index < temp.length; index++) {
      temp.controls[index].setValue(true);
    }
  }
  unselectAll() {
    let temp = this.form.get('studentList') as FormArray;

    for (let index = 0; index < temp.length; index++) {
      temp.controls[index].setValue(false);
    }
  }

}
